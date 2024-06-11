#! /usr/bin/env node

console.log(
    'This script populates some mountains and regions to your database. Specified database as argument - e.g.: node populatedb "mongodb+srv://cooluser:coolpassword@cluster0.lz91hw2.mongodb.net/local_library?retryWrites=true&w=majority"'
  );
  
// Get arguments passed on command line
const userArgs = process.argv.slice(2);

const Mountain = require("./models/mountain");
const Region = require("./models/region");

const mountains = [];
const regions = [];

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const mongoDB = userArgs[0];

main().catch((err) => console.log(err));
  
async function main() {
    console.log("Debug: About to connect");
    await mongoose.connect(mongoDB);
    console.log("Debug: Should be connected?");
    await createRegions();
    await createMountains();
    console.log("Debug: Closing mongoose");
    mongoose.connection.close();
}

// We pass the index to the ...Create functions so that, for example,
// genre[0] will always be the Fantasy genre, regardless of the order
// in which the elements of promise.all's argument complete.
async function regionCreate(index, name, description) {
    const region = new Region({ name: name, description: description });
    await region.save();
    regions[index] = region;
    console.log(`Added region: ${name}`);
}
async function mountainCreate(index, name, height, location, region) {
    const mtndetail = {
        name: name,
        height: height,
        location: location,
    };
    mtndetail.region = region;

    const mtn = new Mountain(mtndetail);
    await mtn.save();
    mountains[index] = mtn;
    console.log(`Added mtn: ${name}`);
}
  
async function createRegions() {
    console.log("Adding regions");
    await Promise.all([
        regionCreate(0, "Northern California", "Northern California features diverse geography with the Sierra Nevada mountains, the volcanic Cascade Range, and coastal ranges, alongside fertile valleys and rugged coastlines."),
        regionCreate(1, "Oregon", "Oregon's geography includes the Cascade Range, coastal mountains, fertile Willamette Valley, high desert in the east, and diverse forests and rivers."),
        regionCreate(2, "Colorado", "Colorado's geography is dominated by the Rocky Mountains, high plains, desert lands, and deep canyons, offering diverse landscapes and elevations."),
    ]);
}
  
  
  async function createMountains() {
    console.log("Adding Mountains");
    await Promise.all([
        mountainCreate(0,
            "Mount Hoffmann",
            10855,
            [37.846914, -119.510539],
            regions[0],
        ),
        mountainCreate(1,
            "Mount Dana",
            13061,
            [37.899902, -119.221093],
            regions[0],
        ),
        mountainCreate(2,
            "Lassen Peak",
            10457,
            [40.488056, -121.505],
            regions[0],
        ),
        mountainCreate(3,
            "Mount Shasta",
            14179,
            [41.409196, -122.194888],
            regions[0],
        ),
        mountainCreate(4,
            "Mount Hood",
            11249,
            [45.373611, -121.695833],
            regions[1],
        ),
        mountainCreate(5,
            "Mount Evans",
            14265,
            [39.5883, -105.6438],
            regions[2],
        ),
        mountainCreate(6,
            "Mount Ida",
            12874,
            [40.371651, -105.779176],
            regions[2],
        ),
    ]);
  }
  
