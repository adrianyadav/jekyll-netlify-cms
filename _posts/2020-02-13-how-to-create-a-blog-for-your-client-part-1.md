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
