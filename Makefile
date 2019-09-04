SERVER:=localhost
PORT:=8000
NODE_BIN:=$(shell npm bin)
ERR_MSG:="\n`tput bold`The server appears to already be running at: http://$(SERVER):$(PORT)\nTake a look at your other terminal windows?"

$(NODE_BIN)/http-server:
	npm install http-server

# you only need to run this once in order to get `make update` to work. it updates your
# git config to watch the course repository for new assignments and the like
config:
	git remote add upstream git://github.com/samizdatco/dvia-2019.git
	git fetch upstream

# run `make update` whenever there's new material on the course repo to pull down changes
update:
	git pull upstream master

# you can your work via a local webserver with `make server`
server: $(NODE_BIN)/http-server
	@$(NODE_BIN)/http-server . -a $(SERVER) -p $(PORT) -c-1 -o || echo $(ERR_MSG)

