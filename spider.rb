require 'json'

file = File.open('public/data/women.html')
parts = []
data = []
while !file.eof?
  begin
  line = file.readline
  parts << line.gsub(/<b>|<\/b>|<br\/>|<br>/, '').gsub("&#160;"," ")
  rescue
  puts line
  end
end
file.close

begin 
  row = parts.shift(9).map(&:strip)
  data << {id: row[3], name: row[4], country: row[5], position: row[0]}
end while !parts.empty?

text = File.open('public/data/women.json', 'w')
text.write JSON.generate(data)
text.close

