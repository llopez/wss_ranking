# pdftohtml -enc UTF-8 -f 2 -l 17 ranking.pdf men.html

require 'json'

file = File.open('public/data/men.html')
parts = []
data = []
while !file.eof?
  line = file.readline
  parts << line.strip
end
file.close

begin 
  row = parts.shift(8)
  data << {id: row[3].split.first, name: row[3].split[1..-1].join(" "), country: row[4], position: row[0]}
end while !parts.empty?

text = File.open('public/data/men.json', 'w')
text.write JSON.generate(data)
text.close

