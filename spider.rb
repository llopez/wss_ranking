require 'json'

file = File.open('public/data/rankings.html')
parts = []
data = []
while !file.eof?
  line = file.readline
  parts << line.gsub(/<b>|<\/b>|<br\/>/, '').gsub("&#160;"," ")
end
file.close

begin 
  row = parts.shift(8).map(&:strip)
  data << {name: row[3], country: row[4], position: row[0]}
end while !parts.empty?

text = File.open('public/data/ranking.json', 'w')
text.write JSON.generate(data)
text.close

