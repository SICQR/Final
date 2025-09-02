import {defineType, defineField} from 'sanity'
export default defineType({
  name:'membersHero', title:'Members Hero', type:'document',
  fields:[
    defineField({ name:'headline', type:'string', validation: R => R.required() }),
    defineField({ name:'subhead', type:'string' }),
    defineField({ name:'imageMobile', type:'image', options:{ hotspot:true } }),
    defineField({ name:'imageDesktop', type:'image', options:{ hotspot:true } }),
    defineField({ name:'ctaPrimaryLabel', type:'string', initialValue:'JOIN WITH TELEGRAM' }),
    defineField({ name:'ctaPrimaryHref', type:'string', initialValue:'/api/auth/telegram/start' }),
    defineField({ name:'ctaSecondaryLabel', type:'string', initialValue:'ALREADY A MEMBER? ENTER' }),
    defineField({ name:'ctaSecondaryHref', type:'string', initialValue:'/members/xxx' }),
  ],
})
