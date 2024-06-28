/* generated by Svelte v3.59.1 */
import {
  SvelteComponent,
  append,
  create_component,
  destroy_component,
  detach,
  element,
  init,
  insert,
  mount_component,
  safe_not_equal,
  space,
  transition_in,
  transition_out,
} from "svelte/internal";

import "./page.css";
import Header from "./Header.svelte";

function create_fragment(ctx) {
  let article;
  let header;
  let t0;
  let section;
  let current;

  header = new Header({
    props: {
      user: /*user*/ ctx[0],
      onLogin: /*onLogin*/ ctx[1],
      onLogout: /*onLogout*/ ctx[2],
    },
  });

  return {
    c() {
      article = element("article");
      create_component(header.$$.fragment);
      t0 = space();
      section = element("section");

      section.innerHTML = `<h2>Pages in Storybook</h2> 
    <img src="./my.png" alt="my alt"/>`;
    },
    m(target, anchor) {
      insert(target, article, anchor);
      mount_component(header, article, null);
      append(article, t0);
      append(article, section);
      current = true;
    },
    p(ctx, [dirty]) {
      const header_changes = {};
      if (dirty & /*user*/ 1) header_changes.user = /*user*/ ctx[0];
      if (dirty & /*onLogin*/ 2) header_changes.onLogin = /*onLogin*/ ctx[1];
      header.$set(header_changes);
    },
    i(local) {
      if (current) return;
      transition_in(header.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(header.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching) detach(article);
      destroy_component(header);
    },
  };
}

function instance($$self, $$props, $$invalidate) {
  let { user = null } = $$props;
  let { onLogin } = $$props;
  const onLogout = {};

  $$self.$$set = ($$props) => {
    if ("user" in $$props) $$invalidate(0, (user = $$props.user));
    if ("onLogin" in $$props) $$invalidate(1, (onLogin = $$props.onLogin));
  };

  return [user, onLogin, onLogout];
}

class Component extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance, create_fragment, safe_not_equal, {
      user: 0,
      onLogin: 1,
      onLogout: 2,
    });
  }

  get onLogout() {
    return this.$$.ctx[2];
  }
}

export default Component;
