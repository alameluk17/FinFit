// a melonJS data manifest
// note : this is note a webpack manifest
const DataManifest = [

    /* Bitmap Text */
    {
        name: "PressStart2P",
        type: "image",
        src:  "./data/fnt/PressStart2P.png"
    },
    {
        name: "PressStart2P",
        type: "binary",
        src: "./data/fnt/PressStart2P.fnt"
    },
    // Map File
    {
        name: "finfit_map",
        type: "tmx",
        src: "./data/map/finfit.tmx"
    },

    // Tilesets
    {
        name: "CityHall",
        type: "tsx",
        src: "./data/tilesets/CityHall.tsx"
    },
    {
        name: "FoodAndCars",
        type: "tsx",
        src: "./data/tilesets/FoodAndCars.tsx"
    },
    {
        name: "Grass",
        type: "tsx",
        src: "./data/tilesets/Grass.tsx"
    },
    {
        name: "House",
        type: "tsx",
        src: "./data/tilesets/House.tsx"
    },
    {
        name: "OfflBuildings",
        type: "tsx",
        src: "./data/tilesets/OfflBuildings.tsx"
    },
    {
        name: "Park",
        type: "tsx",
        src: "./data/tilesets/Park.tsx"
    },
    {
        name: "RoadTiles",
        type: "tsx",
        src: "./data/tilesets/RoadTiles.tsx"
    },
    {
        name: "Shops",
        type: "tsx",
        src: "./data/tilesets/Shops.tsx"
    },
    {
        name: "SpecialBuildings",
        type: "tsx",
        src: "./data/tilesets/SpecialBuildings.tsx"
    },
    {
        name: "Trees",
        type: "tsx",
        src: "./data/tilesets/Trees.tsx"
    },
    // Spritesheets
    {
        name: "CityHall",
        type: "image",
        src:  "./data/img/spritesheets/CityHall.png"
    },
    {
        name: "FoodAndCars",
        type: "image",
        src:  "./data/img/spritesheets/FoodAndCars.png"
    },
    {
        name: "Grass",
        type: "image",
        src:  "./data/img/spritesheets/Grass.png"
    },
    {
        name: "House",
        type: "image",
        src:  "./data/img/spritesheets/House.png"
    },
    {
        name: "OfflBuildings",
        type: "image",
        src:  "./data/img/spritesheets/OfflBuildings.png"
    },
    {
        name: "Park",
        type: "image",
        src:  "./data/img/spritesheets/Park.png"
    },
    {
        name: "RoadTiles",
        type: "image",
        src:  "./data/img/spritesheets/RoadTiles.png"
    },
    {
        name: "Shops",
        type: "image",
        src:  "./data/img/spritesheets/Shops.png"
    },
    {
        name: "SpecialBuildings",
        type: "image",
        src:  "./data/img/spritesheets/SpecialBuildings.png"
    },
    {
        name: "Trees",
        type: "image",
        src:  "./data/img/spritesheets/Trees.png"
    },
    {
        name: "Parabellum_Retro_RPG_Characters_V3_Colour",
        type: "image",
        src:  "./data/img/spritesheets/Parabellum_Retro_RPG_Characters_V3_Colour.png"
    },
    {
        name: "DialogBoxSprite",
        type: "image",
        src:  "./data/img/UIContainer.png"
    },
    {
        name: "#bgmusic", // Melon seems to append the name of the asset+".mp3" when playing assets.
        // something like /bgm/BlipStreamshort.mp3givenname.mp3
        // naming the name "#" will result in the url /bgm/BlipStreamshort.mp3#.mp3
        // so the actual url ends up being something that resolves to the proper file.
        channel:2,
        type: "audio",
        src:  "./data/bgm/BlipStreamshort.mp3"
    }
];

export default DataManifest;
