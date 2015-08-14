use Rack::Static,
  :urls => ["/images", "/js", "/css", "/fonts", "/data"],
  :root => "public"

run lambda { |env|
  if env['REQUEST_PATH'] == '/'
    [
      200,
      {
        'Content-Type'  => 'text/html',
        'Cache-Control' => 'public, max-age=86400'
      },
      File.open('public/index.html', File::RDONLY)
    ]
  elsif env['REQUEST_PATH'] == '/men'
    [
      200,
      {
        'Content-Type'  => 'text/html',
        'Cache-Control' => 'public, max-age=86400'
      },
      File.open('public/index.html', File::RDONLY)
    ]
  elsif env['REQUEST_PATH'] == '/women'
    [
      200,
      {
        'Content-Type'  => 'text/html',
        'Cache-Control' => 'public, max-age=86400'
      },
      File.open('public/women.html', File::RDONLY)
    ]
  elsif env['REQUEST_PATH'] == '/argentina'
    [
      200,
      {
        'Content-Type'  => 'text/html',
        'Cache-Control' => 'public, max-age=86400'
      },
      File.open('public/argentina.html', File::RDONLY)
    ]
  else
    [
      200,
      {
        'Content-Type'  => 'text/html',
        'Cache-Control' => 'public, max-age=86400'
      },
      ["404 not found :("]
    ]
  end
}

