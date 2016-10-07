# -*- coding=utf-8 -*-

import sys
import os.path
import tornado.httpserver
import tornado.ioloop
import tornado.options
import tornado.web
import json
import MySQLdb as db
from tornado.escape import url_escape
from tornado.options import define, options


define("port", default=80, help="run on the given port", type=int)

class HTMLHandler(tornado.web.RequestHandler):
    def initialize(self, path):
       self.path = path

    def get(self):
        self.render(self.path)


class FoodSearchHandler(tornado.web.RequestHandler):
    def initialize(self, dbcon):
        self.dbcon = dbcon

    def post(self):
        food_name = self.get_argument('food_name')
        sql = 'select * from foodknow where 名称 like "%'+ food_name + '%"'
        cursor = dbcon.cursor()
        cursor.execute(sql)
        data = cursor.fetchall()
        columns = ['序号','名称','可食部分','能量','水分','蛋白质','脂肪','膳食纤维','碳水化物','维生素A','维生素B1','维生素B2','烟酸','维生素E','钠','钙','铁','类别','维生素C','胆固醇']
        num = len(columns)
        foods=[]
        for f in data:
            food = {}
            for i in range(1, num):
                food[columns[i]] = f[i]
            foods.append(food)
        self.write(json.dumps(foods))
        # self.render('food_result.html', food_results=foods, original_name=food_name)

if __name__ == '__main__':
    try:
        reload(sys)
        sys.setdefaultencoding("utf-8")
        tornado.options.parse_command_line()
        #connect mysqldb
        dbcon = db.connect('localhost', 'root', '123456', 'bulala', charset='utf8')
        # , (r'/query', QueryHandler, dict(dbcon=dbcon))
        app = tornado.web.Application(
            handlers=[(r'/', HTMLHandler, dict(path='main/index.html')),
            (r'/index.html', HTMLHandler, dict(path='main/index.html')),
            (r'/project.html', HTMLHandler, dict(path='main/project.html')), 
            (r'/resource.html', HTMLHandler, dict(path='main/resource.html')),
            (r'/note.html', HTMLHandler, dict(path='main/note.html')),
            (r'/localweather/index.html', HTMLHandler, dict(path='localweather/index.html')),
            (r'/localweather2/index.html', HTMLHandler, dict(path='localweather2/index.html')),
            (r'/foodknow/index.html', HTMLHandler, dict(path='foodknow/index.html')),
            (r'/query', FoodSearchHandler, dict(dbcon=dbcon)),
            (r'/shalegasdemo/index.html', HTMLHandler, dict(path='shalegasdemo/index.html')),
            (r'/shalegasdemo/left.html', HTMLHandler, dict(path='shalegasdemo/left.html')),
            (r'/shalegasdemo/wellmap.html', HTMLHandler, dict(path='shalegasdemo/wellmap.html')),
            (r'/shalegasdemo/wellinven.html', HTMLHandler, dict(path='shalegasdemo/wellinven.html')),
            (r'/shalegasdemo/datainventory.html', HTMLHandler, dict(path='shalegasdemo/datainventory.html')),
            ],
            debug=True,
            template_path=os.path.join(os.path.dirname(__file__), "templates"),
            static_path=os.path.join(os.path.dirname(__file__), "static")
        )
        http_server = tornado.httpserver.HTTPServer(app)
        http_server.listen(options.port)
        tornado.ioloop.IOLoop.instance().start()
    finally:
        dbcon.close()



