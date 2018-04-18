require 'sinatra/base'
require 'json'

class ThermostatApp < Sinatra::Base
  enable :sessions

  get "/" do
    erb :index
  end

  get "/temp" do
    temp = session[:temp] || 20.to_s

    content_type :json
    { temp: temp }.to_json
  end

  post "/temp" do
    session[:temp] = params[:temp]
    200
  end

  run! if app_file == $0
end
