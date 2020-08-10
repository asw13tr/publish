##### 1) NodeJS in gerekli olan sürümünü kur.
##### 2) Projeni yayınlanacak klasöre indir.
##### 3) npm ile projenin gerekli paketlerinin kurulumunu yap
##### 4) npm ile pm2 paketini kurarak pm2 ile projeni çalıştır.
##### 5) nginx kur ve gelen istekleri uygulamana yönlendir.


## 1) NodeJS gerekli sürümü kur.

**NOT** Projede **npm** e ihtiyaç vardır. Ancak npm NodeJS ile birlikte zaten yüklenmeli.

###### Node.js v14.x:

```sh
# Using Ubuntu
curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash -
sudo apt-get install -y nodejs

# Using Debian, as root
curl -sL https://deb.nodesource.com/setup_14.x | bash -
apt-get install -y nodejs
```

###### Node.js v12.x:
```sh
# Using Ubuntu
curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -
sudo apt-get install -y nodejs

# Using Debian, as root
curl -sL https://deb.nodesource.com/setup_12.x | bash -
apt-get install -y nodejs
```

###### Node.js v10.x:
```sh
# Using Ubuntu
curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -
sudo apt-get install -y nodejs

# Using Debian, as root
curl -sL https://deb.nodesource.com/setup_10.x | bash -
apt-get install -y nodejs
```

## 2) Projeni yayınlanacak klasöre indir.
Eğer tek kullanıcı değilsen veya kesin bir yayın klasörün yoksa en mantıklı seçim kullanıcı klasöründe bir www klasörü olacaktır.

```sh
# Yoksa www klasörünü oluşturabilirsin.
mkdir /home/username/www

# Yayın klasörüne geç
cd /home/username/www

# Projeni indir (Örnek: github)
git clone https://github.com/username/project_name.git
```




## 3) npm ile proje için gerekli paketleri yükle
```bash
# Proje dizinine gir
cd projectdir

# npm ile paketleri indir
npm install

# npm ile projeni çalıştırmayı dene
npm run start
```

Eğer herşey yolunda gittiyse NodeJS projende ayarladığın port a ip adresinle giriş yaparsan site sorunsuz görünecektir. Eğer sunucu ip adresine ulaşabiliyor ancak portta sıkıntı çıkıyorsa portu açmak zorunda olabilirsin. Nginx ile işlerin bittiğinde bu işe gerek kalmayabilir.

## 4) PM2 paketi ile projeni sürekli çalışır tut.
Terminal kapatıldığında yada bir soru olduğunda NodeJS projesi kapanacaktır. Bunun önüne geçmek için NodeJS projesini tıpkı bir servis gibi arka planda çalıştırmaya yarayan PM2 paketi kullanılır.

#### 4. 1) PM2 paketini global olarak kur.
```sh
npm install pm2 -g
```

#### 4. 2) PM2 ile uygulamanı çalıştır.
Çalıştırman gereken dosya npm start ile çalıştırdığın dosyanın aynısıdır. Kökten yazmak daha avantajlı.
```sh
sudo pm2 start /home/username/www/projectdir/bin/www --name=pm2_icin_bir_isim_ver_id_olarak
```

Bu aşamadan sonra artık sorunsuz olarak projen hiç bir terminal sıkıntısı olmadan çalışmalı.

##### FAYDALI PM2 KOMUTLARI

| Komut | Açıklama |
|-------|----------|
| `pm2 start file`  | Bir uygulamayı servis gibi çalıştırır. |
| `pm2 list`   | Tüm uygulamaları listeler |
| `pm2 monit`   |  Uygulama terminal çıktılarını görebileceğin bir ekran getirir. |
| `pm2 stop <id/app_name/'all'>`   | Uygulamayı durdurur  |
| `pm2 restart <id/app_name/'all'>`   |  Uygulamayı yeniden başlatır  |
| `pm2 reload <id/app_name/'all'>`   |  Uygulamayı yeniden yükler  |
| `pm2 delete <id/app_name/'all'>`   |  Uygulamayı siler  |


## 5) NGinx ile gelen istekleri projeye yönlendirmek.
1. Uygulama http://127.0.0.1:5000 portunda çalışsın
2. atabas.xyz ile siteye giriş yapılması isteniyor.

Bu aşamada atabas.xyz domaininden gelenn istekleri Nginx kullanarak **http://127.0.0.1:5000** adresine yönlendireceğim.

#### 5. 1) Kurulu Değilse Nginx kur ve çalıştır.
```sh
# Nginx servisini kur
sudo apt-get install nginx

# Nginx servisini başlat.
sudo systemctl start nginx

# Sistem yeniden başladıktan sonra otomatik açılması için aktif et.
sudo systemctl enable nginx
```

#### 5. 2) atabas.xyz için bir config dosyası düzenle
```sh
# atabasxyz.conf dosyası oluştur
sudo nano /etc/nginx/sites-available/atabasxyz.conf


# Dosya içine yaz.
server {
        listen 80;

        server_name atabas.xyz www.atabas.xyz;

        location / {
                proxy_pass http://127.0.0.1:5000;
                proxy_set_header X-Real-IP $remote_addr;
                proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
                proxy_set_header Host $http_Host;
                proxy_set_header X-NginX-Proxy true;
        }
}
```

#### 5. 3) Son olarak Nginx Servisini yeniden başlat
```sh
sudo systemctl restart nginx
```


# GG
