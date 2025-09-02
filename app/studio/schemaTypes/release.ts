import {defineType, defineField} from 'sanity'
export default defineType({
  name:'release', title:'Release', type:'document',
  fields:[
    defineField({ name:'artist', type:'string', validation: R => R.required() }),
    defineField({ name:'title', type:'string', validation: R => R.required() }),
    defineField({ name:'slug', type:'slug', options:{ source:'title' }, validation: R => R.required() }),
    defineField({ name:'description', type:'text' }),
    defineField({ name:'releasedAt', type:'datetime' }),
    defineField({ name:'art', type:'image', options:{ hotspot:true } }),
    defineField({ name:'tracks', type:'array', of:[{ type:'object', fields:[
      defineField({ name:'title', type:'string', validation: R => R.required() }),
      defineField({ name:'duration', type:'string' })
    ]}]}),
    defineField({ name:'capsuleProducts', type:'array', of:[{ type:'reference', to:[{ type:'product' }] }] }),
  ],
})
