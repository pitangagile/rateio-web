export default {
  dateColumns: [],
  listColumns: {},
  datepickerOptions: {
    locale: {
      cancelLabel: 'Clear',
    },
  },
  datepickerPerColumnOptions: {},
  initialPage: 1,
  perPage: 10,
  perPageValues: [10, 25, 50, 100],
  groupBy: false,
  collapseGroups: false,
  params: {},
  sortable: true, // true or ['column_name', '...']
  filterable: true, // true or ['column_name', '...']
  groupMeta: [],
  initFilters: {},
  customFilters: [],
  templates: {},
  debounce: 250,
  dateFormat: 'DD/MM/YYYY',
  dateFormatPerColumn: {},
  toMomentFormat: false,
  skin: 'table table-hover',
  columnsDisplay: {},
  columnsDropdown: false,
  texts: {
    count: '|{count} registros|Único registro', // Exibindo de {from} a {to} de {count} registros|{count} registros|Único registro
    first: 'Primeira',
    last: 'Ultima',
    filter: '', // Filtro
    filterPlaceholder: 'Pesquisa',
    limit: '', // Registros
    page: '', // Página
    noResults: 'Nenhum registro encontrado',
    filterBy: '', // 'Filtrar por {column}',
    loading: 'Carregando...',
    defaultOption: 'Selecionar {column}',
    columns: 'Colunas',
  },
  sortIcon: {
    base: '',
    is: 'icon-arrow-combo',
    up: 'icon-angle-up',
    down: 'icon-angle-down',
  },
  sortingAlgorithm(data, column) {
    return data.sort(this.getSortFn(column));
  },
  customSorting: {},
  multiSorting: {},
  clientMultiSorting: true,
  serverMultiSorting: false,
  filterByColumn: false,
  highlightMatches: false,
  orderBy: false,
  descOrderColumns: [],
  footerHeadings: false,
  headings: {},
  headingsTooltips: {},
  pagination: {
    dropdown: false,
    chunk: 10,
    edge: false,
    align: 'center',
    nav: 'fixed',
  },
  childRow: false,
  childRowTogglerFirst: true,
  uniqueKey: 'id',
  requestFunction: false,
  requestAdapter(data) {
    return data;
  },
  responseAdapter(resp) {
    const data = this.getResponseData(resp);

    return {
      data: data.data,
      count: data.count,
    };
  },
  requestKeys: {
    query: 'query',
    limit: 'limit',
    orderBy: 'orderBy',
    ascending: 'ascending',
    page: 'page',
    byColumn: 'byColumn',
  },
  rowClassCallback: false,
  preserveState: false,
  saveState: false,
  storage: 'local',
  columnsClasses: {},
};
