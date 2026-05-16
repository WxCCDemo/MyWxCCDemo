# NovaPay

NovaPay is a GitHub Pages-only mock checkout for the collections and payment reminder demo.

## Checkout URL

After this folder is on `main`, GitHub Pages serves the checkout at:

```text
https://wxccdemo.github.io/MyWxCCDemo/NovaPay/index.html
```

## Supabase Setup

Run [supabase/novapay-github-pages.sql](/Users/shailesh/DevProjects/MyWxCCDemo/NovaPay/supabase/novapay-github-pages.sql) in Supabase SQL Editor.

The script creates:

- `novapay_sessions`
- `create_novapay_session`
- `get_novapay_session`
- `complete_novapay_session`

## Create A Payment Link

Call Supabase RPC `create_novapay_session`:

```sql
select *
from public.create_novapay_session(
  1,
  12,
  7,
  1,
  '6587414102',
  '2201',
  'wxccrtmsdemo@gmail.com',
  486.64,
  'https://wxccdemo.github.io/MyWxCCDemo/NovaPay/index.html'
);
```

The returned `payment_url` can be sent to the customer.
