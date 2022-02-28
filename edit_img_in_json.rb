# images already uploaded to ipfs directory
# https://terramoons.mypinata.cloud/ipfs/QmPYqcz3p89SNzHnsdHt6JCbXdB7EceLckdVSQGZBqNZeX/1.png
# https://terramoons.mypinata.cloud/ipfs/QmPYqcz3p89SNzHnsdHt6JCbXdB7EceLckdVSQGZBqNZeX/2.png
#...
# https://terramoons.mypinata.cloud/ipfs/QmPYqcz3p89SNzHnsdHt6JCbXdB7EceLckdVSQGZBqNZeX/1050.png

# edit image links in json files to reflect updated ipfs link
# ----------------------------------------------------------------

require 'json'

# open json file in ./metadata
# edit image link
# inspect metadata files and image links, then upload directory to pinata
num_tokens = 15
file_path = "./metadata/"
target_file_path = "./ipfs_ready_metadata/"
(1..num_tokens).to_a.each do |i|
    # open and load json
    file = File.open("#{file_path}/#{i}.json", 'r')
    json = JSON.load file
    file.close

    # replace image ref to ipfs
    image_ref = json['image']
    image_ref = image_ref.gsub('image/', 'ipfs://QmPYqcz3p89SNzHnsdHt6JCbXdB7EceLckdVSQGZBqNZeX/')
    json['image'] = image_ref

    # modify name
    name = json['name']
    name = "Test Moons #{name}"
    json['name'] = name
    p json

    # save new json to ipfs_ready_metadata folder
    File.open("#{target_file_path}/#{i}.json", 'w') {|f| f.write(JSON.generate(json))}
end