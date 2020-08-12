
Vue.component('post-item', {
    props: ['item'],
    template: `<div class="card mb-1">
        <div class="card-header bg-dark text-light"><h5 class="p-0 m-0">{{ item.title }}</h5></div>
        <div class="card-body">
            <div class="row">
                <div class="col-sm-3"><img v-bind:src="item.img" class="img-fluid"></div>
                <div class="col-sm-9"><p>{{ item.description }}</p></div>
            </div>
        </div>
        <div class="card-footer text-right">
            <button v-on:click="openPost(item.title)" class="btn btn-primary btn-sm">Devamını Oku</button>
        </div>
    </div>`,
    methods: {
        openPost: function(title){
            alert(title + ' başlıklı haber okunacak.');
        }
    }
});

var app = new Vue({
    el: '#app',
    data: {
        title: 'Son Makaleler',
        posts: [
            {   id:1,
                title:'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
                description:'Integer lorem tellus, rhoncus sed sollicitudin ac, tristique a urna. Ut ante turpis, dictum et tortor sed, gravida fringilla lectus. Morbi et lectus placerat massa sodales consectetur ac id lorem. Ut elementum risus quis quam porttitor imperdiet quis id dolor. Integer ante tortor, gravida non ligula ac, efficitur varius dolor. Mauris ut iaculis elit. Nullam dictum sem vel tellus viverra, eget porttitor nisl porta. Mauris venenatis ultrices lorem. Donec vitae interdum sem, vel aliquet felis. Quisque non erat lectus. Ut pretium bibendum ultrices.',
                img:'https://picsum.photos/id/155/400/300'},

            {   id:2,
                title:'Sed quis euismod mi. Aliquam fringilla metus at interdum luctus',
                description:'Nam congue enim convallis ante maximus tempor. Curabitur bibendum tellus et risus faucibus, eu aliquet lectus rhoncus. Nunc tempor pharetra risus, non pellentesque turpis suscipit in. Pellentesque fringilla quam in felis tempor, at facilisis dolor fringilla. Cras vel purus orci. Cras ultrices, dolor sit amet tincidunt tempus, justo erat pellentesque nulla, at facilisis risus ante non tortor. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum tincidunt vulputate purus id accumsan.',
                img:'https://picsum.photos/id/232/400/300'},

            {   id:3,
                title:'Suspendisse sed convallis turpis. ',
                description:'Donec a metus sit amet lectus cursus eleifend et vel augue. Praesent placerat sit amet neque et posuere. Nulla facilisi. Phasellus ornare est ligula, in sollicitudin orci euismod sit amet. Vivamus commodo tristique felis, et congue nunc. Ut vel ante quis risus tincidunt venenatis. Nulla quis tincidunt est, eu vulputate tortor. Sed mollis accumsan aliquam. Praesent nunc erat, fringilla eget sodales eget, feugiat et risus. Morbi non enim ligula.',
                img:'https://picsum.photos/id/247/400/300'},

            {   id:4,
                title:'Sed sed ligula est. Praesent at risus lacinia, vulputate magna ut, posuere quam.',
                description:' Ut at sapien posuere, sagittis mi interdum, euismod lacus. Phasellus venenatis est et magna mattis lacinia. Sed sapien tellus, commodo sed velit vitae, tempor feugiat mauris. Integer augue ex, rhoncus non dapibus in, tempor non nulla. Vestibulum risus ipsum, pellentesque et ante in, suscipit tristique leo. Nam ac augue convallis, finibus dui a, mollis ante.',
                img:'https://picsum.photos/id/188/400/300'},

            {   id:5,
                title:'Sed hendrerit orci imperdiet erat vehicula elementum.',
                description:'Quisque quis lobortis lacus. Cras posuere nunc in sem volutpat pellentesque. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quis diam sollicitudin, pellentesque ipsum non, lacinia neque. Nam ac faucibus enim. Donec accumsan felis at mi mollis ultricies. Aliquam elit erat, dapibus id tempus eu, venenatis ut erat. Etiam congue euismod purus, et lacinia neque auctor nec. Etiam eget tortor ut sapien facilisis gravida consequat faucibus lorem.,',
                img:'https://picsum.photos/id/123/400/300'}
        ]
    },
});
