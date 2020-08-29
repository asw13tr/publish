
const app = new Vue({
    el:'#app',
    data:{
        url_user: '',
        url_article: '',
        articles: ['2987374', '2986860'],
        users: ['36528426', '2000987897', '2000090942'],
        url: {
            profile :'https://rivalregions.com/#slide/profile/:id',
            donate  :'https://rivalregions.com/#slide/donate/user/:id',
            article   :'https://rivalregions.com/#news/show/:id',
            likes :'http://rivalregions.com/listed/article/:id',
        }
    },
    methods: {
        setUserID: function(){
            let id = this.url_user.match(/profile\/(\d+)/g)[0].replace('profile/','');
            if(this.users.indexOf(id) < 0){ this.users.push(id); }
            this.url_user='';
        },
        setArticleID: function(){
            let id = this.url_article.match(/show\/(\d+)/g)[0].replace('show/','');
            if(this.articles.indexOf(id) < 0){ this.articles.push(id); }
            this.url_article='';
        },
        getLikes: function(id){
            let url = this.url.likes.replace(':id', id);
            $.ajax({
                url:url,
                type:'GET',
                crossDomain: true,
                dataType: 'html',
                xhrFields: {
                    withCredentials: true
                },
            }).done(result => {
                console.log(result);
            });
        }
    }
})
