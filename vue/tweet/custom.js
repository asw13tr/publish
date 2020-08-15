Vue.component('twit-item', {
    props:['twit'],
    template: `<article class="border-bottom">
        <strong>{{ twit.author_name }}</strong> <small>@{{ twit.author }} - 13 dk önce</small><br>
        <p>{{ twit.content }}</p>
    </article>`
});

const app = new Vue({
    el: '#app',
    data: {
        message: null,
        twits: []
    },
    mounted: function(){
        this.getTwits();
    },
    methods:{
        sendTwit: function(){
            if(this.message.length > 0){
                let sql = `INSERT INTO vue_twits(author, author_name, content) VALUES('asw13tr', 'Furkan Atabaş', '${this.message}')`;
                $.ajax({
                    url: 'http://127.0.0.1/denemeler/runsql.php',
                    type:'POST',
                    dataType:'json',
                    data: {do:'insert', query:sql},
                }).done(result => {
                    if(result.status){
                        app.twits.unshift(result.result);
                    }
                });

                this.message = null;
            }
        },

        getTwits: function(){
            let query = 'SELECT * FROM vue_twits ORDER BY id DESC';
            $.ajax({
                url:'http://127.0.0.1/denemeler/runsql.php',
                type:'POST',
                data: { do:'select', query:query },
                dataType:'json'
            }).done(function(result){
                if(result.status){
                    app.twits = result.results;
                }
            });
        }
    }
});
