#!/usr/bin/env ruby

require 'json/pure'   # gem install json_pure
require 'cssminify'   # gem install cssminify
require 'uglifier'    # gem install therubyracer; gem install uglifier


### Organize the JSON file
json_filename = 'grams.json'

if File.file?(json_filename) then

  # Read in the JSON file
  qfile = File.open(json_filename, 'r')
  quotes = JSON.parse( qfile.readlines.join() )
  qfile.close

  # Sort alphabetically by author
  quotes = quotes.sort_by{|id,puzzle| puzzle['author']}.to_h

  # Do some analysis
  threshold = 250  # this is just my general idea about what might be a dangerously long quote
  quotes.each { |id,puzzle|
    if id === '' then puts "There's a puzzle with no ID." end
    
    len = puzzle['text'].length + puzzle['author'].length
    if len > threshold then
      puts "Puzzle \"#{id}\" has #{len} characters."
    end

    ## Help with finding missing source links
    #if puzzle['source'].nil? then
    #  puts "<a href=\"https://en.wikiquote.org/wiki/#{puzzle['author'].gsub(/ /,'_')}\">#{puzzle['author']}</a><br>"
    #end
  }
    
    
  # Write the sorted file
  File.write(
    json_filename,
    JSON.pretty_generate(quotes, {'indent'=>'  '})
  )

  puts "Finished writing #{json_filename}.  There are #{quotes.length} puzzles."
end


### Minify the CSS file
src_css_filename = 'crypto.css'
min_css_filename = 'c.css'

if ! File.file?(min_css_filename) ||
   ( File.open(src_css_filename).mtime <=> File.open(min_css_filename).mtime ) == 1 then

  File.open(min_css_filename, 'w').write(
    CSSminify.compress(
      File.open(src_css_filename)
    )
  )

  action_taken = "Finished writing"
else
  action_taken = "No need to update"
end

puts "#{action_taken} #{min_css_filename}."


### Minify the JS file
src_js_filename = 'jam.js'
min_js_filename = 'j.js'

if ! File.file?(min_js_filename) ||
    ( File.open(src_js_filename).mtime <=> File.open(min_js_filename).mtime ) == 1 then

  File.open(min_js_filename, 'w').write(
    Uglifier.compile(
      File.read(src_js_filename)
    )
  )

  action_taken = "Finished writing"
else
  action_taken = "No need to update"
end

puts "#{action_taken} #{min_js_filename}."
