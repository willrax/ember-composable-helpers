import Ember from 'ember';

const {
  Helper,
  computed: { sort },
  defineProperty,
  get,
  isArray,
  isEmpty,
  isPresent,
  observer,
  set
} = Ember;

export default Helper.extend({
  compute(sortProps) {
    let array = sortProps.pop();

    set(this, 'array', array);
    set(this, 'sortProps', sortProps);

    return get(this, 'content');
  },

  sortPropsDidChange: observer('sortProps', function() {
    let sortProps = get(this, 'sortProps');


    if (isEmpty(sortProps)) {
      defineProperty(this, 'content', []);
    }

    defineProperty(this, 'content', sort('array', 'sortProps'));
  }),

  contentDidChange: observer('content', function() {
    this.recompute();
  })
});
