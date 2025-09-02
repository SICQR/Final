import {defineType, defineField} from 'sanity'
export default defineType({
  name:'collection', title:'Collection', type:'document',
  fields:[
    defineField({ name:'title', type:'string', validation: R => R.required() }),
    defineField({ name:'slug', type:'slug', options:{ source:'title' }, validation: R => R.required() }),
    defineField({ name:'tagline', type:'string' }),
    defineField({ name:'image', type:'image', options:{ hotspot:true } }),
  ],
})
