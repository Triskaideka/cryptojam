#!/usr/bin/env ruby

### Minify the CSS file
require 'cssminify'   # gem install cssminify
require 'uglifier'    # gem install therubyracer; gem install uglifier

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
