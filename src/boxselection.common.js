
//框选工具的源码，这里适用于通用浏览器环境下
(function(_global){
  if(_global.BoxSelect){
    throw new Error("your enviroment has exists BoxSelect, to Avoid program error,You'd better check it.");
  }
 function BoxSelect({trigger,cube,cubecontent}) {

      this.Trigger = document.getElementById(trigger) || document.querySelector(trigger) || 'undefined';      //get selectevent container
      this._content = document.getElementsByClassName(cubecontent) || 'undefined';
      this.cube = document.createElement('div');
      this.Trigger.appendChild(this.cube);
      if(!this.Trigger || !this._content){
        throw new Error('constructor is not certain!!');
      }
      this.cube.style.backgroundColor = cube ? cube.backgroundColor : 'rgba(65,105,225,.2)';
      this.cube.style.position = 'absolute';
      this.cube.style.display = 'none';
      this.cubeContent = [];                //get prepare cubeContent
      this.cube.style.border = cube ? cube.border : '1px dashed #1967D2';
      this.Trigger.addEventListener('mousedown',(e) => {
        this.flag = true;
        this.originX = e.clientX ;
        this.originY = e.clientY ;
        this.cubeContent = [];
      },false);

      this.Trigger.addEventListener('mousemove',(e) => {
        if(this.flag){
          let resultX = e.clientX  - this.originX;
          let resultY = e.clientY - this.originY;

          if(resultX > 0 && resultY >0){
            this.cube.style.left = this.originX + "px";
            this.cube.style.top = this.originY + "px";

          }else if(resultX < 0 && resultY < 0){
            this.cube.style.left = (this.originX - Math.abs(resultX) )+ "px";
            this.cube.style.top = (this.originY - Math.abs(resultY) )+ "px";

          }else if(resultY < 0 && resultX > 0){
            this.cube.style.left = this.originX + "px";
            this.cube.style.top = (this.originY - Math.abs(resultY) )+ "px";


          }else if(resultX < 0 && resultY > 0){
            this.cube.style.left = (this.originX - Math.abs(resultX) )+ "px";
            this.cube.style.top = this.originY + "px";
          }
          this.cube.style.display = 'inline-block';
          this.cube.style.width =	Math.abs(resultX) +'px';
          this.cube.style.height = Math.abs(resultY) + 'px';
        }
      },false);

  }

  BoxSelect.prototype.onselect = function(callback) {         //select event

    this.Trigger.onmouseup = e => {
      console.log('我进来了啊');
      this.cube.style.display = 'none';
      this.flag = false;
      if(Math.abs(e.clientX - this.originX) < 8){      //Avoid short Click Event
        return;
      }
      this.originX = null;
      this.originY = null;
      this.cubeContent = [];

      let cubeleft = +this.cube.style.left.replace(/px/,''),
      cubetop = +this.cube.style.top.replace(/px/,'') + this.Trigger.scrollTop,
      cubeHeigth = + this.cube.style.height.replace(/px/,''),
      cubeWidth = + this.cube.style.width.replace(/px/,'');
      let cube_x1 = cubeleft,        //get cube coodinates
      cube_y1 = cubetop ,
      cube_x3 = cubeleft,
      cube_y3 = cubetop + cubeHeigth ,
      cube_x2 = cubeleft + cubeWidth,
      cube_y2 = cubetop ,
      cube_x4 = cube_x2,
      cube_y4 = cube_y3;
      for(let key = 0;key <this._content.length;key ++){
        let box_x1 = this._content[key].offsetLeft,       //get cubecontent coodinates
        box_x2 = this._content[key].offsetLeft + this._content[key].offsetWidth,
        box_y1 = this._content[key].offsetTop ,
        box_y3 = this._content[key].offsetTop + this._content[key].offsetHeight,
        box_y2 = this._content[key].offsetTop ;
      if((box_x1 < cube_x1 && cube_x1 < box_x2) && (box_y1 < cube_y1 && cube_y1 < box_y3)){

        this.cubeContent.push(this._content[key]);
      }else if((box_x1 < cube_x3 && cube_x3 < box_x2) && (box_y1 < cube_y3 && cube_y3 < box_y3)){

        this.cubeContent.push(this._content[key]);
      }else if((box_x1 < cube_x2 && cube_x2 < box_x2) && (box_y1 < cube_y2 && cube_y2 < box_y3)){

        this.cubeContent.push(this._content[key]);
      }else if((box_x1 < cube_x4 && cube_x4 < box_x2) && (box_y1 < cube_y4 && cube_y4 < box_y3)){

        this.cubeContent.push(this._content[key]);
      }else if((cube_x1 < box_x1 && box_x1 < cube_x2) && (cube_y1 < box_y1 && box_y1 < cube_y3)){

        this.cubeContent.push(this._content[key]);
      }else if((cube_x1 < box_x2 && box_x2 < cube_x2) && (cube_y1 < box_y2 && box_y2 < cube_y3)){

        this.cubeContent.push(this._content[key]);
      }else{

      Outer:
        for(let i = box_x1;i <= box_x2;i++){
          if(i == cube_x1){
            for(let j = cube_y1;j < cube_y3;j++){
              if(box_y1 == j){
                this.cubeContent.push(this._content[key]);
                break Outer;
              }
            }
          }
        }
      }
      }
      callback(this.cubeContent);
      this.cube.style.width =	0 +'px';
      this.cube.style.height = 0 + 'px';
    };
  }
  _global.BoxSelect = BoxSelect;

})(this);
