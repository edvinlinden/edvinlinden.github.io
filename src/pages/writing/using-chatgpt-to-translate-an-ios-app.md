---
layout: ../../layouts/Article.astro
title: Using ChatGPT to translate an iOS app
description: How I used ChatGPT to translate an iOS app faster than using Google Translate.
date: 2023-03-14
tags: ["articles"]
image: /images/writing/chatgpt-translation.png
readingTime: 2 minutes
---

ChatGPT, GitHub Copilot, AI - The tools that will take our jobs, or so everyone says. This past weekend I put ChatGPT to the test with my first real use case.

I've been thinking about translating my app <a href="https://boxtimer.app/?ref=edvinlinden.se" target="_blank" rel="noopener noreferrer">Box Timer</a> to a few different languages in order to support more users. This is a pretty simple task with SwiftUI and Apple Xcode's latest localization features.

However I only speak Swedish and English, in order to translate the app to German, Spanish or any other language I need some help. Usually I would turn to Google Translate, but I would have to translate each text over and over for each language I want to support.

ChatGPT to the rescue! The use case was clear, translate a text from English to multiple languages all at once. 

The prompt goes something like 
> Translate "Edit Timer" to Spanish, German, French, Swedish and Polish

And the output I get is translated and ready to be put into the lanuage files.
> Spanish: "Editar temporizador"<br />
German: "Timer bearbeiten"<br />
French: "Modifier le minuteur"<br />
Swedish: "Redigera timer"<br />
Polish: "Edytuj timer"

ChatGPT and Google Translate don't always agree and I can't rely on either of them if I want perfect translations. But for this applicaton it's more than good enough.

If you haven't tried ChatGPT yet I really suggest that you do! It's a fun tool to play around with.
