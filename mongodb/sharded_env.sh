# BASH
MONGODB_HOME=/mongodb/2.4.6
PATH="$PATH:$MONGODB_HOME/bin"
export MONGODB_HOME

####################################

# DEPENDENCIES
sudo apt-get install git-core build-essential scons

wget http://fastdl.mongodb.org/linux/mongodb-linux-x86_64-2.4.6.tgz
tar -xzvf mongodb-linux-x86_64-2.4.6.tgz

sudo mkdir -p /mongodb/config
sudo mv mongodb-linux-x86_64-2.4.6 /mongodb/2.4.6
rm -rf mongodb-linux-x86_64-2.4.6.tgz

####################################

#########################
sudo mkdir -p /data/db/rs0 /data/log
sudo chmod 0755 -R /data
#sudo chown ubuntu -R /data

#scp -i ../keys/mongodb.pem ../keys/keyFile mongod.conf ubuntu@54.200.151.181:/mongodb/config/
#scp -i ../keys/mongodb.pem init.sh initRepl.sh ubuntu@54.200.151.181:/mongodb/

#########################


# SHARD 0 (MACHINE 1/2/3/4)
sudo mkdir -p /data/shard0/rs0 /data/shard0/rs1 /data/shard0/rs2 /data/shard0/rs3 /data/log
sudo chmod 777 -R /data

mongod --replSet shard0 --logpath "/data/log/shard0-rs0.log" --dbpath /data/shard0/rs0 --port 27017 --fork --shardsvr --smallfiles
mongod --replSet shard0 --logpath "/data/log/shard0-rs1.log" --dbpath /data/shard0/rs1 --port 27017 --fork --shardsvr --smallfiles
mongod --replSet shard0 --logpath "/data/log/shard0-rs2.log" --dbpath /data/shard0/rs2 --port 27017 --fork --shardsvr --smallfiles
mongod --replSet shard0 --logpath "/data/log/shard0-rs3.log" --dbpath /data/shard0/rs3 --port 27017 --fork --shardsvr --smallfiles

sleep 5

mongo --port 27017 << 'EOF'
config = { 
    _id: "shard0",
    members: [
        { _id: 0, host: "IP.MACHINE.1: 27017" },
        { _id: 1, host: "IP.MACHINE.2: 27017" },
        { _id: 2, host: "IP.MACHINE.3: 27017" },
        { 
            _id: 3, 
            host: "IP.MACHINE.4: 27017",
            slaveDelay: 2000,
            priority: 0
        }
    ]
};
rs.initiate(config)
EOF

# MONGOS, MACHINE 4 (APP MACHINE)
mkdir -p /data/config/config-a /data/config/config-b /data/config/config-c /data/log

mongod --logpath "/data/log/config-a.log" --dbpath /data/config/config-a --port 27027 --fork --configsvr --smallfiles
mongod --logpath "/data/log/config-b.log" --dbpath /data/config/config-b --port 27028 --fork --configsvr --smallfiles
mongod --logpath "/data/log/config-c.log" --dbpath /data/config/config-c --port 27029 --fork --configsvr --smallfiles

# now start the mongos on a standard port
mongos --logpath "/data/log/mongos-1.log" --configdb IP.MONGOS:27027,IP.MONGOS:27028,IP.MONGOS:27029 --fork

# add shards
mongo <<'EOF'
db.adminCommand({ addshard : "shard0/IP.MACHINE.1:27017" });
EOF

# enable sharding in some db and collection
mongo <<'EOF'
db.adminCommand({ enableSharding: "test" });
db.adminCommand({ shardCollection: "test.collection", key: { my_shard_key: 1 }});
EOF
