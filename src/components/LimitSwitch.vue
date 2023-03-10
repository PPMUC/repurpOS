<template>
  <div id="canvas" class="uk-width-1-3">
      <canvas ref="canvas" id="myCanvas" width="300" height="200" 
      style="border:1px solid #000000;">
      </canvas>
  </div>
</template>

<script>

    import { mapGetters, mapActions, mapMutations } from "vuex";

    export default{
        name: "LimitSwitch",
        components: {},
        data() {
          return {}
        },
        computed: {
            isOpen() {
              return this.$store.state.machine.limitSwitches;
              },
            isRunning() {
               return this.$store.state.machine.isRunning;
            },
            ...mapGetters({
              limitSwitchStates: "machine/limitSwitches",
            }),
        }, 
        mounted() {
          const canvas = this.$refs.canvas.getContext('2d')
          this.vueCanvas = canvas;

          for(let limitSwitch of this.limitSwitchStates){
            if(limitSwitch.state == false){
              console.log(limitSwitch.name + " is open")
            }
          }

          //front bottom door 
          this.vueCanvas.moveTo(30,170);
          this.vueCanvas.lineTo(270,170);
          this.vueCanvas.stroke();

          //filling the front bottom door with red colour 
          //Run this if front bottom door is open
          for(let limitSwitch of this.limitSwitchStates){
            if(limitSwitch.name == "frontB"){
              this.vueCanvas.fillStyle = "red";
              this.vueCanvas.fillRect(30,170,240,30);
            }
          }
          //front top door
          this.vueCanvas.moveTo(200,140);
          this.vueCanvas.lineTo(100,140);
            
          this.vueCanvas.moveTo(200,140);
          this.vueCanvas.lineTo(200,170);
      
          this.vueCanvas.moveTo(100,140);
          this.vueCanvas.lineTo(100,170);
          this.vueCanvas.stroke();

          //filling the front top door with red colour 
          for(let limitSwitch of this.limitSwitchStates){
            if(limitSwitch.name == "frontT"){
              this.vueCanvas.fillStyle = "red";
              this.vueCanvas.fillRect(100,140,100,30);
            }
          }
        

          //back bottom door 
          this.vueCanvas.moveTo(0,30);
          this.vueCanvas.lineTo(300,30);
          this.vueCanvas.stroke();

          //filling the back bottom door with red 
          for(let limitSwitch of this.limitSwitchStates){
            if(limitSwitch.name == "backB"){
              this.vueCanvas.fillStyle = "red";
              this.vueCanvas.fillRect(0,0,350,30);
            }
          }
        
          //back top door 
           this.vueCanvas.moveTo(200,60);
           this.vueCanvas.lineTo(100,60);
            
           this.vueCanvas.moveTo(200,60);
           this.vueCanvas.lineTo(200,30);
      
           this.vueCanvas.moveTo(100,60);
           this.vueCanvas.lineTo(100,30);
           this.vueCanvas.stroke();

           //filling the back top door with red
           for(let limitSwitch of this.limitSwitchStates){
            if(limitSwitch.name == "backT"){
              this.vueCanvas.fillStyle = "red";
              this.vueCanvas.fillRect(100,30,100,30);
            }
          }

           //left bottom door
           this.vueCanvas.moveTo(30,200);
           this.vueCanvas.lineTo(30,30);
           this.vueCanvas.stroke();

           //filling the laft bottom door with red 
           for(let limitSwitch of this.limitSwitchStates){
            if(limitSwitch.name == "leftB"){
              this.vueCanvas.fillStyle = "red";
              this.vueCanvas.fillRect(0,30,30,300);
            }
          }
          
           //left top door 
           this.vueCanvas.moveTo(70,70);
           this.vueCanvas.lineTo(70,140);
            
           this.vueCanvas.moveTo(30,70);
           this.vueCanvas.lineTo(70,70);
      
           this.vueCanvas.moveTo(30,140);
           this.vueCanvas.lineTo(70,140);
           this.vueCanvas.stroke();

           //filling the left top dooor
           for(let limitSwitch of this.limitSwitchStates){
            if(limitSwitch.name == "leftT"){
              this.vueCanvas.fillStyle = "red";
              this.vueCanvas.fillRect(30,70,40,70);
            }
          }
          
           //right bottom door 
           this.vueCanvas.moveTo(270,200);
           this.vueCanvas.lineTo(270,30);
           this.vueCanvas.stroke();

           //filling the right bottom door 
           for(let limitSwitch of this.limitSwitchStates){
            if(limitSwitch.name == "rightB"){
              this.vueCanvas.fillStyle = "red";
              this.vueCanvas.fillRect(270,30,30,300);
            }
          }
        
           //right top door
           this.vueCanvas.moveTo(230,70);
           this.vueCanvas.lineTo(230,140);
            
           this.vueCanvas.moveTo(270,70);
           this.vueCanvas.lineTo(230,70);
      
           this.vueCanvas.moveTo(230,140);
           this.vueCanvas.lineTo(270,140);
           this.vueCanvas.stroke();

           //filling the top door with red
           for(let limitSwitch of this.limitSwitchStates){
            if(limitSwitch.name == "rightT"){
              this.vueCanvas.fillStyle = "red";
              this.vueCanvas.fillRect(230,70,40,70);
            }
          }
        },
    }
</script>


<style lang="scss" scoped>
//   @use "../assets/css/variables";
//      canvas {
//       color: #fcbe24;
//        padding: 0 24px;
//        margin: 0;
//      }
</style>