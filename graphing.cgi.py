#!/usr/bin/env python3
import cgitb
cgitb.enable()

import cgi
import mysql.connector
import json

form = cgi.FieldStorage()

def main():
    conn = mysql.connector.connect(user='zhangz22', password='soft4664RICH', host='localhost', database='zhangz22')
    curs = conn.cursor()
    
    selected_pathology = form.getvalue("pathology")
    selected_dataset1 = form.getvalue("dataset1")
    selected_dataset2 = form.getvalue("dataset2")
    
    query = f"select p1.{selected_dataset1} as value1, p2.{selected_dataset2} as value2 from {selected_dataset1} as p1, {selected_dataset1} as p2 " \
                f"where p1.PatientID = p2.PatientID " 

    curs.execute(query)

    data1 = []
    data2 = []
    for row in curs.fetchall():
        value1, value2 = row
        data1.append(value1)
        data2.append(value2)

    conn.close()
    curs.close()

    response_data = {
        "data1": data1,
        "data2": data2
    }
    
    print("Content-Type: application/json\n")
    print(json.dumps(response_data))

main()
