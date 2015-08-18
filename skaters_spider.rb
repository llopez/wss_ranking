# pdftohtml -enc UTF-8 skaters-july-2015.pdf skaters-july-2015.html

require 'json'

file = File.open('public/data/skaters-july-2015.html')
parts = []
data = []
while !file.eof?
  line = file.readline
  parts << line.strip 
end
file.close

begin 
  row = parts.shift(3)
  data << {id: row[0], name: row[1], country: row[2]}
end while !parts.empty?

text = File.open('public/data/skaters.json', 'w')
text.write JSON.generate(data)
text.close

