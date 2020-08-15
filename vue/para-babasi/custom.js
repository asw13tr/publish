const app = new Vue({

    el: '#app',

    data:{
        site: {
                outerColClass: 'col-12 col-sm-7 col-lg-6'
        },

        products: [
            {id:1, name:'Limon',    image:'lemon.png',     buy:0.30,  sale:0.50,  level:1,   xp:1,   time:250 , prTime:250 , stock:0,  percent:0,   loop:null},
            {id:2, name:'Domates',  image:'tomato.png',    buy:0.45,  sale:0.90,  level:5,   xp:3,   time:500 , prTime:500 , stock:0,  percent:0,   loop:null},
            {id:3, name:'Yumurta',  image:'egg.png',       buy:0.75,  sale:1.50,  level:10,  xp:5,   time:1000, prTime:1000, stock:0,  percent:0,   loop:null},
            {id:4, name:'Muz',      image:'bananas.png',   buy:2.40,  sale:4.25,  level:20,  xp:10,  time:1500, prTime:1500, stock:0,  percent:0,   loop:null},
            {id:5, name:'Avakado',  image:'avocado.png',   buy:2.80,  sale:5.00,  level:30,  xp:15,  time:2000, prTime:2000, stock:0,  percent:0,   loop:null},
            {id:6, name:'Kokonat',  image:'coconut.png',   buy:7.50,  sale:12.00, level:50,  xp:25,  time:2500, prTime:2500, stock:0,  percent:0,   loop:null},
            {id:7, name:'Ananas',   image:'pineapple.png', buy:10.00, sale:17.00, level:100, xp:50,  time:3000, prTime:3000, stock:0,  percent:0,   loop:null},
            {id:8, name:'Bal',      image:'honey.png',     buy:25.00, sale:35.00, level:150, xp:100, time:5000, prTime:5000, stock:0,  percent:0,   loop:null}
        ],

        clickTimes: [
            {id:1, click:1,     buy:0,     level:1},
            {id:2, click:5,     buy:0,     level:5},
            {id:3, click:10,    buy:0,     level:10},
            {id:4, click:25,    buy:0,     level:25},
            {id:5, click:50,    buy:0,     level:50},
            {id:6, click:100,   buy:0,     level:100}
        ],

        dividing:100,
        player: {
            xp: 100,
            money: 20.00,
            clickTimes: 1

        },
        downInterval: null
    },

    methods:{
        buyProduct: function(index){
            let total_count = this.player.clickTimes;
            let total_price = (this.products[index].buy * this.player.clickTimes).toFixed(2);
            if(this.player.money >= total_price){
                this.products[index].stock+=total_count;
                this.player.money = this.player.money - total_price;
            }else{
                let maxProductsCount = Math.floor(this.player.money / this.products[index].buy);
                total_price = (this.products[index].buy * maxProductsCount).toFixed(2);
                this.products[index].stock+=maxProductsCount;
                this.player.money = this.player.money - total_price;
            }

        },

        setClickTimes: function(value){
            this.player.clickTimes=value;
        },

        sellProduct: function(index){

            this.products[index].loop = setInterval(function(){
                if(app.products[index].stock > 0){

                    app.products[index].stock--;
                    app.player.money = app.player.money + app.products[index].sale;
                    app.player.xp+=app.products[index].xp;

                }else{
                    app.sellStop(index);
                    app.fillProgres(index);
                }
            }, this.products[index].time);
            app.fillProgres(index);
        },

        fillProgres: function(index){
            if(this.products[index].loop != null){
                this.products[index].percent = 100;
            }else{
                this.products[index].percent = 0;
            }
        },


        sellStop: function(index){
            clearInterval(this.products[index].loop);
            this.products[index].loop = null;
        }
    }

});
