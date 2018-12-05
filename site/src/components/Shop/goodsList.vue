<template>
  <div>
    <div class="swiper-container">
      <ul class="swiper-container-ul">
        <li class="swiper-container-ul-li actives">商品</li>
        <li class="swiper-container-ul-li">店铺</li>
      </ul>
      <div class="swiper-wrapper">
        <div class="swiper-slide">
          <div class="content">
            <div class="left" id="left">
              <ul>
                <li v-for="(item,index) in goodsList">{{index}}</li>
              </ul>
            </div>
            <div class="right" id="right">
              <ul>
                <li v-for="(item,index) in goodsList">
                  <div class="class-title">{{index}}</div>
                  <div v-for="goods in item">
                    <div class="item">
                      <div class="item-left">
                        <div class="item-img">
                          <img :src="goods.goodsPic | imgUrl" alt="">
                        </div>
                      </div>
                      <div class="item-right">
                        <div class="title">{{goods.goodsName}}</div>
                        <div class="subtitle">数量：{{goods.goodsNum}}</div>
                        <div class="price">价格：{{goods.price | currency}}</div>
                      </div>
                      <div class="btn">
                        <button class="add" @click="add(goods._id)">+</button>
                        <span>{{fn(goods._id)}}</span>
                        <button class="sub" @click="sub(goods._id)" v-show="fn(goods._id)">-</button>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="swiper-slide" style="display:none;">店铺介绍</div>
      </div>
    </div>
    <Car v-if="carList.length!==0" :carList="carList" ></Car>
  </div>
</template>

<script>
import '@/assets/jquery.js';
import '@/assets/goodsList.js';
import { Toast } from 'mint-ui';
import Car from './car';

export default {
  name: "goods-list",
  props: ["shopId"],
  data() {
    return {
      goodsList: {},
      phoneId:'',
      carList:[]
    }
  },
  components:{
    Car
  },
  methods: {
    getGoodsList() {
      this.$ajax
        .get("/getGoods", {
          params: {
            shopId: this.shopId
          }
        })
        .then(data => {
          this.goodsList = data.goodsList;
        });
    },
    getCarList(){
      this.$ajax.get('/getCarList',{
        params:{
          phoneId:this.phoneId,
          shopId:this.shopId
        }        
      })
        .then(data=>{
          if(data.ok===1){
            this.carList = data.carList?data.carList:[]
          }
        })
    },
    fn(id){
      var i=this.carList.find(v=>v.goodsId===id)
      return i?i.buyNum:''
    },
    add(id){
      this.carList=[];
      if(this.phoneId){
        this.$ajax.post('/addCar',{
          phoneId:this.phoneId,
          goodsId:id,
          shopId:this.shopId
        })
          .then(data=>{
            if(data.ok===1){
              this.getCarList()
            }
          })
      }else{
        this.$router.push('/Login')
      }
    },
    sub(id){    
      this.carList=[];  
      this.$ajax.post('/subCar',{
        phoneId:this.phoneId,
        shopId:this.shopId,
        goodsId:id
      })
        .then(data=>{
          if(data.ok===1){
            this.getCarList()
          }          
        })
    }
  },
  mounted() {
    this.getGoodsList();  
  },
  beforeMount(){
    var i=JSON.parse(localStorage.userInfo).phoneId;
    this.phoneId = i?i:'';
    if(this.phoneId){
      this.getCarList()
    }
  }
};
</script>

<style scoped>
@import "../../../static/css/goodsList.css";

.btn button{
  border-radius: 50%;
  border: none;
  background-color: #2396ff;
  color: #fff;  
}
</style>