import { TextureAtlas,loader,game,UIBaseElement} from "melonjs";

// a Panel type container
class UIContainer extends UIBaseElement {

    constructor(x, y, width, height, label) {
        // call the constructor
        super(x, y, width, height);

        // [0, 0] as origin
        this.anchorPoint.set(0, 0);
        console.log(game.texture)
        // give a name
        this.name = "UIPanel";
        // back panel sprite
        let texturemap =  new TextureAtlas(
            { framewidth: 16, frameheight: 16},
            loader.getImage("Parabellum_Retro_RPG_Characters_V3_Colour")
        );
        texturemap.createSpriteFromName();
        this.addChild(texturemap.createSpriteFromName(
            [0],
            { width : this.width, height : this.height},
            true
        ));

        // this.addChild(new Text(this.width / 2, 16, {
        //     font: "kenpixel",
        //     size: 20,
        //     fillStyle: "black",
        //     textAlign: "center",
        //     textBaseline: "top",
        //     bold: true,
        //     text: label
        // }));

        // input status flags
        this.isHoldable = true;

        // panel can be dragged
        this.isDraggable = false;
    }
};
export default UIContainer;