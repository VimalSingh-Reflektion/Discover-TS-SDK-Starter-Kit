/**
 * This hook is an example of how customers can implement pagination range to be used on Pagination primitive provided from @sitecore-discover/ui.
 * The approach followed was getting from MUI here:
 * https://github.com/mui/material-ui/blob/master/packages/mui-material/src/usePagination/usePagination.js
 *
 * To see examples of how it works, refer to this page: https://mui.com/material-ui/react-pagination/
 */
import useControlled from './useControlled';

interface PaginationProps {
  boundaryCount?: number;
  totalPages?: number;
  defaultPage?: number;
  disabled?: boolean;
  hideNextButton?: boolean;
  hidePrevButton?: boolean;
  onChange?: (event: KeyboardEvent, value: number) => void;
  page?: number;
  showFirstButton?: boolean;
  showLastButton?: boolean;
  siblingCount?: number;
  includeControlButtons?: boolean;
}
export default function usePagination(props: PaginationProps = {}) {
  // keep default values in sync with @default tags in Pagination.propTypes
  const {
    boundaryCount = 1,
    totalPages: count = 1,
    defaultPage = 1,
    disabled = false,
    hideNextButton = false,
    hidePrevButton = false,
    onChange: handleChange,
    page: pageProp,
    showFirstButton = false,
    showLastButton = false,
    siblingCount = 1,
    includeControlButtons = false,
    ...other
  } = props;

  const [page, setPageState] = useControlled({
    controlled: pageProp,
    default: defaultPage,
  });

  const handleClick = (event: KeyboardEvent, value: number) => {
    if (!pageProp) {
      setPageState(value);
    }
    if (handleChange) {
      handleChange(event, value);
    }
  };

  // https://dev.to/namirsab/comment/2050
  const range = (start: number, end: number) => {
    const length = end - start + 1;
    return Array.from({ length }, (_, i) => start + i);
  };

  const startPages = range(1, Math.min(boundaryCount, count));
  const endPages = range(Math.max(count - boundaryCount + 1, boundaryCount + 1), count);

  const siblingsStart = Math.max(
    Math.min(
      // Natural start
      page - siblingCount,
      // Lower boundary when page is high
      count - boundaryCount - siblingCount * 2 - 1,
    ),
    // Greater than startPages
    boundaryCount + 2,
  );

  const siblingsEnd = Math.min(
    Math.max(
      // Natural end
      page + siblingCount,
      // Upper boundary when page is low
      boundaryCount + siblingCount * 2 + 2,
    ),
    // Less than endPages
    endPages.length > 0 ? endPages[0] - 2 : count - 1,
  );

  // Basic list of items to render
  // e.g. itemList = ['first', 'previous', 1, 'ellipsis', 4, 5, 6, 'ellipsis', 10, 'next', 'last']
  const itemList = [
    ...(includeControlButtons && showFirstButton ? ['first'] : []),
    ...(includeControlButtons && hidePrevButton ? [] : ['previous']),
    ...startPages,

    // Start ellipsis
    // eslint-disable-next-line no-nested-ternary
    ...(siblingsStart > boundaryCount + 2
      ? ['start-ellipsis']
      : boundaryCount + 1 < count - boundaryCount
      ? [boundaryCount + 1]
      : []),

    // Sibling pages
    ...range(siblingsStart, siblingsEnd),

    // End ellipsis
    // eslint-disable-next-line no-nested-ternary
    ...(siblingsEnd < count - boundaryCount - 1
      ? ['end-ellipsis']
      : count - boundaryCount > boundaryCount
      ? [count - boundaryCount]
      : []),

    ...endPages,
    ...(includeControlButtons && hideNextButton ? [] : ['next']),
    ...(includeControlButtons && showLastButton ? ['last'] : []),
  ];

  // Map the button type to its page number
  const buttonPage = (type: string) => {
    switch (type) {
      case 'first':
        return 1;
      case 'previous':
        return page - 1;
      case 'next':
        return page + 1;
      case 'last':
        return count;
      default:
        return null;
    }
  };

  // Convert the basic item list to PaginationItem props objects
  const items = itemList.map((item) =>
    typeof item === 'number'
      ? {
          'onClick': (event: KeyboardEvent) => {
            handleClick(event, item);
          },
          'type': 'page',
          'page': item,
          'selected': item === page,
          disabled,
          'aria-current': item === page ? 'true' : undefined,
        }
      : {
          onClick: (event: KeyboardEvent) => {
            handleClick(event, buttonPage(item));
          },
          type: item,
          page: buttonPage(item),
          selected: false,
          disabled:
            disabled ||
            (item.indexOf('ellipsis') === -1 && (item === 'next' || item === 'last' ? page >= count : page <= 1)),
        },
  );

  return {
    items,
    ...other,
  };
}
