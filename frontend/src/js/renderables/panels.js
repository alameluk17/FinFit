import { TextureAtlas,loader,game,UIBaseElement, Vector2d} from "melonjs";

// a Panel type container
class UIContainer extends UIBaseElement {

    constructor(x, y, width, height, label) {
        // call the constructor
        super(x, y, width, height);
        // give a name
        this.name = "UIPanel";
        // back panel sprite
        let texturemap =  new TextureAtlas(
            { framewidth: 240, frameheight: 320},
            loader.getImage("DialogBoxSprite")
        );
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