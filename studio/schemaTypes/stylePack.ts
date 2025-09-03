import {defineType, defineField} from 'sanity'
export default defineType({
  name: 'stylePack', title: 'Style Pack', type: 'document',
  fields: [
    defineField({ name:'title', type:'string', validation: R => R.required() }),
    defineField({ name:'isActive', type:'boolean', initialValue:false, description:'Only one should be active.' }),
    defineField({ name:'colors', type:'object', fields:[
      defineField({ name:'bg', type:'string', initialValue:'#000000' }),
      defineField({ name:'fg', type:'string', initialValue:'#FFFFFF' }),
      defineField({ name:'accent', type:'string', initialValue:'#FF5300' }),
      defineField({ name:'muted', type:'string', initialValue:'#8A8A8A' }),
    ]}),
    defineField({ name:'type', type:'object', fields:[
      defineField({ name:'headline', type:'string', initialValue:'Inter, system-ui, sans-serif' }),
      defineField({ name:'body', type:'string', initialValue:'Inter, system-ui, sans-serif' }),
    ]}),
    defineField({ name:'radius', type:'number', initialValue:12 }),
    defineField({ name:'shadow', type:'string', initialValue:'0 6px 24px rgba(0,0,0,.3)' }),
    defineField({ name:'motionMs', type:'number', initialValue:160 }),
  ],
})
