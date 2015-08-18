# pdftohtml -enc UTF-8 -f 18 -l 28 ranking.pdf women.html

require 'json'

file = File.open('public/data/women.html')
parts = []
data = []
while !file.eof?
  line = file.readline
  parts << line.strip
end
file.close

begin 
  row = parts.shift(9)
  data << {id: row[3], name: row[4], country: row[5], position: row[0]}
end while !parts.empty?

text = File.open('public/data/women.json', 'w')
text.write JSON.generate(data)
text.close

