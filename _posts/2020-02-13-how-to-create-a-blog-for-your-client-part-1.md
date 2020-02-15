---
layout: post
title: Creating a blog with Jekyll + Netlify CMS part 1
---
- - -

layout: post title: Creating a blog with Jekyll + Netlify CMS part 1

- - -

I've always wonder what the best way to create a blog is from a developer experience as well as a client one.

Wordpress for me was too much out of the box and included a lot of stuff I didn't really need. I stumbled upon using [Jekyll](https://jekyllrb.com/) (a static blog generator) with [Netlify](https://www.netlify.com/) for hosting as well as [Netlify CMS](https://www.netlifycms.org/) for content management.

In this series, we will be making a blog editable via Netlify CMS.

The final product will look like: <http://adrianyadav-blog.netlify.com/> and we will make every bit of content on the page editable via an admin interface Netlify provides.

## Few notes

If you are ever unsure of how a file should look like: take a look at the [completed repo](ttps://github.com/adrianyadav/jekyll-netlify-cms-blog).

If you see the command "Code" it's set to opens visual studio code, feel free to use whatever text editor you want.

## Let's get started

I've already created a repo to help kickstart off things

```
git clone git@github.com:adrianyadav/jekyll-template-starter.git my-blog
cd my-blog
bundle
jekyll serve --livereload
```

Open up <http://127.0.0.1:4000/> in Google Chrome and you see the following:

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

Sign up for an account on <https://www.netlify.com/> and log in. Hit the create a new site button and connect it to your git account, select the repository and hit deploy.

If you get stuck follow on from [here](https://www.netlify.com/blog/2015/10/28/a-step-by-step-guide-jekyll-3.0-on-netlify/#connecting-to-netlify).

If all goes well, Netlify will deploy your site live on a randomly generated URL like <https://adoring-murdock-f38c3d.netlify.com/>.

## Adding Nelify CMS to the blog

```
mkdir admin && cd admin && touch index.html
code index.html
```

Copy the following into index.html.

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

Create the config file with the following contents.

```
touch _config.yml
```

```
# config.yml

backend:
name: git-gateway
branch: master # Branch to update (optional; defaults to master)
media_folder: 'assets/uploads'
collections:

-   name: "blog"
    label: "Blog"
    folder: "\_posts/"
    fields:
    -   { name: Title }
```

## Enable identity and git gateway:

Follow the instructons on [Netlify Docs](https://www.netlifycms.org/docs/add-to-your-site/#enable-identity-and-git-gateway). Create a user for yourself and enable git gateway too.

```
code \_includes/head.html
```

add the following:

```
<script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>
```

Your head.html file should end up like the following:

```
<head>
	<meta charset="UTF-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
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

</head>
```

Let's commit everything and push.

```
git add --all
git commit -am "added netlify cms"
git push origin master"
```

Every time you push to git, your netlify site will redeploy.

Now, check your email and you should have received one from Nelify.

![accept-link](/img/uploads/you've-been-invited.png)

Click on "accept the invite link" which will let you create a password for your Netlify account.

add /admin to your site and login, e.g. <https://adoring-murdock-f38c3d.netlify.com/admin>

Finally you should get the below:

![](/img/uploads/netlify-admin.png)

## Let's add the ability for users to create and delete posts

Open up your netlify /admin/config.yml and replace collections with the folowing

```
collections: # A list of collections the CMS should be able to edit

-   name: "post" # Used in routes, ie.: /admin/collections/:slug/edit
    label: "Post" # Used in the UI, ie.: "New Post"
    folder: "\_posts" # The path to the folder where the documents are stored
    sort: "date:desc" # Default is title:asc d
    description: "Manage your posts here"
    create: true # Allow users to create new documents in this collection
    slug: "{{year}}-{{month}}-{{day}}-{{slug}}"
    summary: "{{title}} -- {{year}}/{{month}}/{{day}}"
    fields: # The fields each document in this collection have
    -   { label: "Layout", name: "layout", widget: "hidden", default: "post" }
    -   { label: "Title", name: "title", widget: "string", tagname: "h1" }
    -   { label: "Body", name: "body", widget: "markdown" }
    -   {
        label: "Categories",
        name: "categories",
        widget: "string",
        required: false,
        }
        meta: # Meta data fields. Just like fields, but without any preview element
    -   {
        label: "Publish Date",
        name: "date",
        widget: "datetime",
        format: "YYYY-MM-DD hh:mm:ss",
        }
```

Commit and push

```
git commit -am "feat: posts"
git push origin master
```

You can also access /admin locally.

```
jekyll serve --livereload
http://127.0.0.1:4000/admin/
```

Create a new post through the GUI and in few seconds you should see it at top:

<https://adoring-murdock-f38c3d.netlify.com/> and <https://adoring-murdock-f38c3d.netlify.com/2020/02/15/testpost-123.html>

![created-post](/img/uploads/created-post.png)

Remember to sync your local with the live version everytime you create a new post.

```
git pull origin master
```

## Now for the fun stuff

Now that all the setup is done, we can move on the fun stuff. In the next part, we will make the rest of the site editable via netlify (the header, footer and about page).

Stay tuned.
