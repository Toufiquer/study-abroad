look at the main page.tsx and Now please generate a edit/page.tsx for editing each page as following instruction. 

/page-builder/edit/page.tsx
  - it will get page title from parems. and if not found page title in Data base then show Not found message. if found then do the follwoing things.
  - at the top there is a div for editting main data like "pageTitle, pagePath, isActive"
  - after the div there is a section named SectionEditor. it will edting all sections.
    -- describ SectionEditor as section-card.tsx [I will give the code below]
      - at the top there is a button named Add section [as add-section-dialog.tsx] . it will popUP and I choose one section from them.
      - I can drug and drop section.
      - I can edit and delete section. 
  - then there is there is list of subPages.
  - for each subpage I can click them and it will go to [it will go /page-builder/edit/subpage?pageTitle="contact-page"&subPage="courses"]


  and here is rtk-query then you can to use 
  ```
    useGetPagesQuery,
  useGetPageByIdQuery,
  useAddPageMutation,
  useUpdatePageMutation,
  useDeletePageMutation,
  useBulkUpdatePagesMutation,
  useBulkDeletePagesMutation,
  ```