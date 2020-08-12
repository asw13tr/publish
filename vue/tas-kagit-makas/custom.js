Vue.component('user-card', {
    props:['player'],
    template: `<div>
        <h6 class="m-0 bg-primary text-center text-light p-1">{{ player.name }}</h6>
        <img v-if="player.selectedImg" v-bind:src="player.selectedImg" class="img-thumbnail img-fluid mt-1 mb-1">
        <img v-else="player.selectedImg" v-bind:src="player.img" class="img-thumbnail img-fluid mt-1 mb-1">
        <strong>%{{ player.hp }}</strong>
        <div class="progress">
            <div :class="['progress-bar', 'progress-bar-striped', getProgressColor()]" role="progressbar"  :style="{width: player.hp+'%'}"" aria-valuenow="10" aria-valuemin="0" aria-valuemax="100"></div>
        </div>
    </div>`,
    methods: {
        getProgressColor: function(){
            if(this.player.hp > 70){
                return 'bg-success';
            }else if(this.player.hp > 40){
                return 'bg-warning';
            }else{
                return 'bg-danger';
            }
        }
    }
});

Vue.component('item-card', {
    props:['item'],
    template: `<div class="col-4 p-1"><button class="btn btn-default p-0 m-0" v-on:click="selectedItem(item)" :title="item.name"><img :src="item.img" :alt="item.name" class="img-fluid img-thumbnail"></button></div>`,
    methods: {
        selectedItem: function(item){
            let computerItem = game.computerSelect();
            if(computerItem.name == item.lose){ // Kaybettim
                game.player1.hp = game.player1.hp - 10;
                game.isLose = true;
            }else if(computerItem.name == item.win){ // Kazandım
                game.player2.hp = game.player2.hp - 10;
                game.isWin = true;
            }else{
                game.isTie = true;
            }
            game.isSelected = true;
            game.player1.selectedImg = item.img;
            game.player2.selectedImg = computerItem.img;

            if(game.player1.hp < 1){
                game.isFinish = true;
                game.player2.winner = true;
                game.player1.selectedImg = game.image.loser;
                game.player2.selectedImg = game.image.winner;

            }else if(game.player2.hp < 1){
                game.isFinish = true;
                game.player1.winner = true;
                game.player1.selectedImg = game.image.winner;
                game.player2.selectedImg = game.image.loser;

            }else{
                setTimeout(game.resetRound, 2000);
            }

        }
    }
});


const game = new Vue({
    el: '#game',

    data: {
        player1: { id:1, name:'1. Oyuncu',  winner:false, hp:100, img:'img/gamer.png'    , selectedImg: null},
        player2: { id:2, name:'Bilgisayar', winner:false, hp:100, img:'img/computer.png' , selectedImg: null},
        options: [
            { id:1, name:'Taş',   win:'Makas', lose:'Kağıt',  img:'img/tas.png' },
            { id:2, name:'Kağıt', win:'Taş',   lose:'Makas',  img:'img/kagit.png' },
            { id:3, name:'Makas', win:'Kağıt', lose:'Taş',    img:'img/makas.png' },
        ],
        isSelected: false,
        isWait: false,
        isWin: false,
        isLose: false,
        isTie: false,
        isFinish: false,
        image: {
            winner: 'img/winner.png',
            loser: 'img/loser.png'
        }
    },

    methods: {
        computerSelect: function(){
            let randNumber = Math.round( Math.random() * 2 );
            return this.options[randNumber];
        },
        resetRound: function(){
            this.player1.selectedImg=null;
            this.player2.selectedImg=null;
            this.isSelected = false;
            this.isWin = false;
            this.isLose = false;
            this.isTie = false;
        },
        restartGame: function(){
            this.resetRound();
            this.isFinish = false;
            this.player1.hp = 100;
            this.player2.hp = 100;
            this.player1.winner = false;
            this.player2.winner = false;
        }
    }
});
