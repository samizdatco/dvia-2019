SERVER=localhost
PORT=8000
HTTPD=node_modules/http-server/bin/http-server
ERR_MSG="\n`tput bold`The server appears to already be running at: http://$(SERVER):$(PORT)\nTake a look at your other terminal windows?"

$(HTTPD):
	npm install --prefix=. --no-save $(notdir $(HTTPD))

# you only need to run this once in order to get `make update` to work. it updates your
# git config to watch the course repository for new assignments and the like
config:
	git remote add upstream git://github.com/samizdatco/dvia-2019.git
	git fetch upstream

# run `make update` to pull down changes whenever there's new material on the course repo
update:
	git pull upstream master

# you can view your work via a local webserver with `make server`
server: $(HTTPD)
	@$(HTTPD) . -a $(SERVER) -p $(PORT) -c-1 -o || echo $(ERR_MSG)
