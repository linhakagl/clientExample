
// The toolbar groups arrangement, optimized for two toolbar rows.
export const   ckEditorConfig = {
    toolbarGroups : [
        { name: 'clipboard',   groups: [ 'clipboard', 'undo' ] },
        { name: 'editing',     groups: [ 'find', 'selection', 'spellchecker' ] },
        { name: 'links' },
        { name: 'insert' },
        { name: 'forms' },
        { name: 'tools' },
        { name: 'document',	   groups: [ 'mode', 'document', 'doctools' ] },
        { name: 'others' },
        '/',
         { name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ] },
         { name: 'paragraph',   groups: [ 'list', 'indent', 'blocks', 'align', 'bidi' ] },
        { name: 'styles' },
         { name: 'colors' },
        { name: 'about' }
    ],
    extraPlugins : 'colorbutton',
    removeButtons : 'Underline,Subscript,Superscript',
    ormat_tags : 'p;h1;h2;h3;pre',
    removeDialogTabs : 'image:advanced;link:advanced'
}
