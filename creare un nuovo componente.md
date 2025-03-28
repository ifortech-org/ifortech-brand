Lista dei file da creare quando si vuole creare un nuovo componente

sanity/schemas/blocks/[nome_componente]/[nome_componente].ts
aggiungere type: "[nome_componente]" dentro /sanity/schemas/documents/page.ts dove ci sono tutti gli altri (hero-1 ecc...)
aggiungere il nuovo "[nome_componente]" allo schema generale sanity/schema.ts nella sezione blocks
/sanity/queries/[nome_componente]/[nome_componente].ts
ed anche qui aggiungere nei blocks il [nome_componente] dentro /sanity/queries/page.ts
creare il componente dentro /components/ui/[nome_componente]/[nome_componente].tsx
aggiungerlo alla componentMap dentro /components/blocks.tsx
