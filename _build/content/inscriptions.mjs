// Short inscriptions for engraving, stitching and printing. All lines are original.
// text | occasions | who | tone      " / " marks a line break.
// Placeholders: {name} {name2} {date} {roman} {year} {initials}

const RAW = `
{name}|any|anyone|minimal
{initials}|any|anyone|minimal
{name} / {date}|any|anyone|classic
{name} / {roman}|any|anyone|classic
{date}|any|anyone|minimal
{roman}|any|anyone|minimal
Est. {year}|any|anyone|minimal
{name}, always|any|partner friend child|heartfelt
For {name}, with love|any|anyone|heartfelt
Made for {name}|any|anyone|classic
Property of {name}|any|anyone|playful
This belongs to {name}|any|child anyone|playful
Hands off. It is {name}'s.|any|anyone|playful
{name} & {name2}|wedding anniversary valentines|partner|minimal
{name} & {name2} / {date}|wedding anniversary|partner|classic
{name} + {name2} / Est. {year}|wedding anniversary housewarming|partner|classic
{name} & {name2} / {roman}|wedding anniversary|partner|classic
Still you|anniversary valentines|partner|minimal
Still yes|anniversary valentines|partner|minimal
You, every time|anniversary valentines|partner|heartfelt
Home is wherever you are|anniversary valentines housewarming|partner|heartfelt
My favourite hello|valentines anniversary|partner|heartfelt
The best thing I ever said yes to|anniversary wedding|partner|heartfelt
Same team, always|anniversary wedding|partner|heartfelt
Us, since {year}|anniversary|partner|classic
Day one: {date}|anniversary wedding|partner|classic
One year down, the rest to go|anniversary|partner|playful
I would marry you again|anniversary|partner|heartfelt
Your turn to make the tea|anniversary valentines|partner|playful
I love you. Take the bins out.|valentines anniversary|partner|playful
You are my best decision|valentines anniversary wedding|partner|heartfelt
Yours, with all of it|wedding valentines|partner|heartfelt
I choose you, today and after|wedding|partner|heartfelt
To have and to hold|wedding|partner|classic
Two names, one home|wedding housewarming|partner|classic
The day it began / {date}|wedding anniversary|partner|classic
With this, I am yours|wedding|partner|classic
Thank you for raising the person I love|wedding|mom dad|heartfelt
For your happy tears / {date}|wedding|mom dad grandparent|heartfelt
Best man, best friend|wedding|friend|classic
I could not do today without you|wedding|friend|heartfelt
Maid of honour / {date}|wedding|friend|classic
Stood beside us / {date}|wedding|friend|classic
Happy birthday, {name}|birthday|anyone|classic
{name}, born {date}|birthday baby|anyone|classic
Another year of you|birthday|partner friend|heartfelt
The world got better on {date}|birthday|anyone|heartfelt
Older, wiser, still late|birthday|friend partner|playful
Vintage {year}|birthday|anyone|playful
Made in {year}. All original parts.|birthday|anyone|playful
Aged to perfection|birthday|anyone|playful
Many more to come|birthday|anyone|classic
Go on, have the cake|birthday|friend|playful
Welcome to the world, {name}|baby|child|heartfelt
{name} / {date}|baby|child|classic
Hello, {name}|baby|child|minimal
Loved before you arrived|baby|child|heartfelt
So small, already everything|baby|child|heartfelt
The day you made us three|baby|child|heartfelt
First of many adventures|baby graduation|child|heartfelt
Sleep well, little one|baby|child|classic
For {name}, to open at eighteen|baby|child|heartfelt
Mum since {year}|mothers|mom|minimal
Mom since {year}|mothers|mom|minimal
Everything I am started with you|mothers|mom|heartfelt
You were right about most of it|mothers|mom|playful
Thank you for the lifts|mothers fathers|mom dad|playful
First teacher, best one|mothers|mom|heartfelt
The heart of this family|mothers|mom grandparent|heartfelt
Loved by {name}|mothers fathers|mom dad grandparent|classic
Raised us right. Mostly.|mothers fathers|mom dad|playful
Home is your kitchen|mothers|mom grandparent|heartfelt
Dad since {year}|fathers|dad|minimal
Dad's. Put it back.|fathers|dad|playful
Taught me everything worth knowing|fathers|dad grandparent|heartfelt
The original and the best|fathers|dad|playful
Thanks for holding the bike|fathers|dad|heartfelt
Still my first call|fathers mothers|dad mom|heartfelt
Chief of the barbecue|fathers|dad|playful
Head of repairs|fathers|dad grandparent|playful
Measured twice, cut once|fathers|dad grandparent|classic
Best grandad going|fathers birthday|grandparent|playful
Nana's kitchen / Est. {year}|mothers birthday christmas|grandparent|classic
Where the stories come from|birthday christmas|grandparent|heartfelt
Grandchildren spoiled here|birthday christmas|grandparent|playful
Class of {year}|graduation|child anyone|minimal
{name} / Class of {year}|graduation|child anyone|classic
The first of many|graduation|child anyone|heartfelt
You did the work|graduation|child anyone|heartfelt
Go far. Call home.|graduation|child|heartfelt
Onward|graduation retirement|anyone|minimal
So you always find your way back|graduation|child|heartfelt
Now the interesting part|graduation retirement|anyone|playful
Proud does not cover it|graduation|child|heartfelt
The world is lucky to get you|graduation|child friend|heartfelt
Earned, not given|graduation|anyone|classic
Welcome home|housewarming|anyone|minimal
{name} / Est. {year}|housewarming wedding|anyone|classic
The {name} kitchen|housewarming christmas|anyone|classic
Shoes off, kettle on|housewarming|anyone|playful
First keys / {date}|housewarming|anyone|classic
Home, at last|housewarming|anyone|heartfelt
Come in, sit down|housewarming|anyone|classic
Our first front door|housewarming|partner|heartfelt
Thank you, {name}|thanks|anyone|classic
With thanks / {date}|thanks retirement|anyone|classic
You made the difference|thanks|teacher colleague anyone|heartfelt
For everything you did|thanks|anyone|heartfelt
The best teacher I had|thanks|teacher|heartfelt
Thank you for seeing me|thanks|teacher|heartfelt
You taught us more than the lessons|thanks|teacher|heartfelt
From the desk of {name}|thanks graduation|teacher colleague|classic
Class of {year} says thank you|thanks|teacher|classic
We noticed. Thank you.|thanks|colleague anyone|heartfelt
For going first|thanks|colleague friend|heartfelt
The team would not work without you|thanks|colleague|heartfelt
{name} / {year} years of service|retirement|colleague|classic
Well earned|retirement|colleague anyone|minimal
The work was better with you in it|retirement|colleague|heartfelt
Out of office. For good.|retirement|colleague|playful
No more Mondays|retirement|colleague|playful
On your own time now|retirement|colleague|playful
Thank you for the years|retirement|colleague|heartfelt
You built this|retirement|colleague|heartfelt
In loving memory of {name}|memorial|anyone|classic
{name} / always with us|memorial|anyone|heartfelt
{name} / loved and missed|memorial|anyone|classic
Forever in the garden|memorial|grandparent mom dad|heartfelt
Sit a while|memorial|anyone|minimal
Still here in everything|memorial|anyone|heartfelt
Carried with us|memorial|anyone|heartfelt
Loved every day|memorial|anyone|heartfelt
Your light stays on|memorial|anyone|heartfelt
The best of dogs|memorial|pet|heartfelt
Good dog, {name}|memorial birthday|pet|heartfelt
{name} / best friend|memorial birthday|pet|classic
Chief of naps|birthday|pet|playful
Will sit for snacks|birthday|pet|playful
If found, call my person|any|pet|playful
{name} / Christmas {year}|christmas|anyone|classic
{name}'s first Christmas / {year}|christmas baby|child|classic
Our first Christmas / {year}|christmas wedding|partner|classic
Believe|christmas|child anyone|minimal
Home for Christmas|christmas|anyone|heartfelt
The {name} family / {year}|christmas|anyone|classic
Santa, stop here for {name}|christmas|child|playful
Friends since {year}|friendship birthday|friend|classic
You are my person|friendship birthday|friend|heartfelt
Same time next week?|friendship|friend|playful
Through all of it|friendship|friend|heartfelt
The family I chose|friendship birthday|friend|heartfelt
Partner in crime, retired|friendship birthday|friend|playful
Remember that weekend?|friendship birthday|friend|playful
Text me when you are home|friendship|friend|heartfelt
Miles apart, same page|friendship|friend|heartfelt
I knew you were trouble|friendship birthday|friend|playful
Drive safe, {name}|any graduation|child partner friend|heartfelt
Come home safe|any|partner child|heartfelt
Keep going|any graduation|anyone|minimal
Be brave|any graduation baby|child anyone|minimal
Stay curious|any graduation|child anyone|minimal
One day at a time|any|anyone|minimal
You are enough|any|anyone|heartfelt
Breathe|any|anyone|minimal
Make good trouble of your own|graduation|child friend|playful
Read me|any|anyone|playful
Open in case of bad day|any friendship|friend partner|playful
Do not lose this one|any|anyone|playful
Coffee first|any|anyone|playful
Tea, then talk|any|anyone|playful
Wine o'clock somewhere|any housewarming|friend|playful
Cheers to us|wedding anniversary friendship|partner friend|classic
To the next chapter|retirement graduation wedding|anyone|classic
Here is to you|birthday retirement thanks|anyone|classic
With love, always|any|anyone|heartfelt
Love you more|any valentines|partner mom child|heartfelt
Love, {name2}|any|anyone|classic
From {name2}, with love|any|anyone|heartfelt
All my love / {name2}|any valentines anniversary|partner|heartfelt
Yours / {name2}|valentines anniversary|partner|minimal
{name}'s workshop|fathers birthday|dad grandparent|classic
{name}'s garden|mothers birthday retirement|mom grandparent anyone|classic
{name}'s bar|birthday housewarming fathers|dad friend|classic
{name}'s library|birthday graduation|anyone|classic
From the library of {name}|birthday graduation thanks|anyone teacher|classic
Chef {name}|birthday mothers fathers|mom dad anyone|playful
Captain {name}|birthday fathers retirement|dad anyone|playful
Coach {name}|thanks birthday|teacher anyone|classic
Dr {name}|graduation|child anyone|classic
The one and only {name}|birthday|anyone|playful
`;

export const INSCRIPTIONS = RAW.trim().split('\n').map((line) => {
  const [text, occ, who, tone] = line.split('|');
  return { t: text, o: occ.split(' '), w: who.split(' '), n: tone };
});
