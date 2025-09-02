import {defineType, defineField} from 'sanity'
export default defineType({
  name:'product', title:'Product', type:'document',
  fields:[
    defineField({ name:'title', type:'string', validation: R => R.required() }),
    defineField({ name:'slug', type:'slug', options:{ source:'title' }, validation: R => R.required() }),
    defineField({ name:'price', type:'number', validation: R => R.required() }),
    defineField({ name:'sizes', type:'array', of:[{ type:'string' }] }),
    defineField({ name:'copy', type:'text' }),
    defineField({ name:'images', type:'array', of:[{ type:'image', options:{ hotspot:true }},{ type:'file' }] }),
    defineField({ name:'collectionRef', type:'reference', to:[{ type:'collection' }] }),
    defineField({ name:'availability', type:'string', options:{ list:['in_stock','low','sold_out'] } }),
  ],
})
