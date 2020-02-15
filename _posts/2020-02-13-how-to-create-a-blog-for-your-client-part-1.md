---
layout: post
title: Creating a blog with Jekyll + Netlify CMS part 1
---


 I've always wonder what the best way to create a blog is from a developer experience as well as a client one. Wordpress for me was too much out of the box and a lot of stuff I didn't really need. I stumbled upon using Jekyll (a static blog generator) with Netlify CMS (headless CMS) and am loving  how easy and intuitive everything is.

In this series, we will be making a blog editable via Netlify CMS.

The final product will look like: <http://adrianyadav-blog.netlify.com/> and we will make every bit of content on the page editable via an admin interface **Netlify** provides.

## Let's get started

I've already created a repo to help kickstart off things

```
git clone git@github.com:adrianyadav/jekyll-template-starter.git my-blog
cd my-blog
bundle
jekyll serve --livereload                                                   
```

Open up http://127.0.0.1:4000/ in Google Chrome and you see the following:

![Adrian's Blog](/img/uploads/blog-running.jpg)

Let's commit everything to Git.

```
git init
git remote set-url origin <your-origin-here>
git add --all
git commit -am "initial commit"
git push origin master
jekyll serve --livereload                                                                                          
```

## Connecting the repo to Netlify

Sign up for an account on https://www.netlify.com/ and log in. Hit the create a new site button and connect it to your git account and select the repository. And finally hit deploy.

(If you get stuck follow on from <https://www.netlify.com/blog/2015/10/28/a-step-by-step-guide-jekyll-3.0-on-netlify/#connecting-to-netlify> 

If all goes well, Netlify will deploy your site live on a randomly generated URL like <https://adoring-murdock-f38c3d.netlify.com/>

## Adding Nelify CMS to the blog

```
mkdir admin && cd admin && touch index.html
code index.html
```

Copy the following into index.html

```
<!-- admin/index.html -->
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Content Manager</title>
  </head>
  <body>
    <!-- Include the script that builds the page and powers Netlify CMS -->
    <script src="https://unpkg.com/netlify-cms@^2.0.0/dist/netlify-cms.js"></script>
  </body>
</html>
```

Create the config file with the following contents

```
touch _config.yml

# config.yml

backend:
  name: git-gateway
  branch: master # Branch to update (optional; defaults to master)
media_folder: 'assets/uploads'
```

## Enable identity and git gateway:
https://www.netlifycms.org/docs/add-to-your-site/#enable-identity-and-git-gateway

``` 
code _includes/head.html

```

add the following: 

```
<script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>

``


Your Head.html file should end up like this

```
<head>
	<meta charset="UTF-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	{% feed_meta %} {% seo %}
	<link
		href="https://fonts.googleapis.com/css?family=Nunito+Sans:400,400i,700&display=swap"
		rel="stylesheet"
	/>
	<script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>

	<!-- Global site tag (gtag.js) - Google Analytics -->
	<script
		async
		src="https://www.googletagmanager.com/gtag/js?id=UA-93042573-3"
	></script>
	<script>
		window.dataLayer = window.dataLayer || [];
		function gtag() {
			dataLayer.push(arguments);
		}
		gtag('js', new Date());

		gtag('config', 'UA-93042573-3');
	</script>

	<style>
		{% capture include_to_scssify %}
		  {% include main.scss %}
		{% endcapture %}
		{{ include_to_scssify | scssify }}
	</style>
</head>
```

Let's commit everything and push.

