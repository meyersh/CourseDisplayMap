row = '<tr><td id="monCol"></td><td id="tueCol"></td><td id="wedCol"></td><td id="thurCol"></td><td id="friCol"></td></tr>'
for x in range(7,22):
    row = '<tr>'
    for day in ('HOUR', 'mon', 'tue', 'wed', 'thur', 'fri'):
        if day == 'HOUR':
            val = '%d:00' % x
        else:
            val = ''
        row += '<td id="%sCol%dHour">%s</td>' % (day, x, val)
    row += '</tr>'
    print row
