import React from 'react';
import { Box, Typography } from '@repo/ui/components';
import { Back, Next } from '@repo/ui/icons';
import { theme } from '@repo/ui/theme';
import classNames from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/router';
import qs from 'qs';
import { ParsedUrlQuery } from 'querystring';
import styled from 'styled-components';

interface IPaginationPrevProps {
  query: ParsedUrlQuery;
  prev: number;
  pathname: string;
}

interface IPaginationNextProps {
  query: ParsedUrlQuery;
  next: number;
  pathname: string;
}

interface IPaginationProps {
  totalPage: number;
}

const PrevAndNextWrapper = styled(Box)`
  cursor: pointer;
  &:hover {
    span {
      color: ${({ theme }) => theme.color.gray600};
    }
    svg {
      path {
        stroke: ${({ theme }) => theme.color.gray600};
      }
    }
  }
`;

const PageWrapper = styled(Box)`
  cursor: pointer;
  &.active {
    &:hover {
      background-color: ${({ theme }) => theme.color.primary500};
      border-radius: 50%;
    }
  }
  &:hover {
    background-color: ${({ theme }) => theme.color.primary50};
    border-radius: 50%;
  }
`;

const PaginationPrev = ({ query, prev, pathname }: IPaginationPrevProps) => {
  const prevQuery = { ...query };
  prevQuery.page = String(prev);
  return (
    <Link href={`${pathname}?${qs.stringify(prevQuery)}`}>
      <PrevAndNextWrapper display="flex" alignItems="center">
        <Back width="20" height="20" color={theme.color.gray900} />
        <Typography
          fontSize={theme.fontSize.text14}
          m="0px 4px"
          color={theme.color.gray900}
          as="span"
        >
          이전
        </Typography>
      </PrevAndNextWrapper>
    </Link>
  );
};

const PaginationNext = ({ query, next, pathname }: IPaginationNextProps) => {
  const nextQuery = { ...query };
  nextQuery.page = String(next);
  return (
    <Link href={`${pathname}?${qs.stringify(nextQuery)}`}>
      <PrevAndNextWrapper display="flex" alignItems="center">
        <Typography
          fontSize={theme.fontSize.text14}
          m="0px 4px"
          color={theme.color.gray900}
          as="span"
        >
          다음
        </Typography>
        <Next width="20" height="20" color={theme.color.gray900} />
      </PrevAndNextWrapper>
    </Link>
  );
};

const Pagination: React.FC<IPaginationProps> = ({ totalPage }) => {
  const router = useRouter();
  const { query, pathname } = router;
  const currentPage = query?.page ? Number(query.page) : 1;
  const limit = 20;
  const handlePage = (pageIndex: number, index: number) => {
    const total = totalPage;
    const current = currentPage;
    const page = pageIndex + 1;

    const preservedDistanceToEdge = 4;
    const distanceToLastPage = Math.abs(total - page);
    const distanceToCurrent = Math.abs(page - current);
    const isEdgePage = page === total || page === 1;
    const isLastPreservedRange =
      total - current < preservedDistanceToEdge && distanceToLastPage < preservedDistanceToEdge;
    let isFirstPreservedRange =
      page <= preservedDistanceToEdge + 1 && current <= preservedDistanceToEdge + 1;

    if (current === preservedDistanceToEdge + 1 && total > limit) {
      isFirstPreservedRange = false;
    }
    if (
      total >= limit &&
      current !== page &&
      !isEdgePage &&
      !isFirstPreservedRange &&
      !isLastPreservedRange &&
      distanceToCurrent > 3
    ) {
      return (
        <span
          className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 truncated"
          key={`dot-${index}`}
        >
          ...
        </span>
      );
    }
    const newQuery = { ...query };
    newQuery.page = String(page);
    const active = page === current;
    return (
      <Link
        href={`${pathname}?${qs.stringify(newQuery)}`}
        key={`page-${index}`}
        style={{ margin: '0px 4px' }}
      >
        <PageWrapper
          width="32px"
          height="32px"
          fontSize={theme.fontSize.text14}
          color={active ? theme.color.white : theme.color.gray400}
          backgroundColor={active ? theme.color.primary500 : theme.color.white}
          borderRadius={active ? '50%' : '0'}
          display="flex"
          justifyContent="center"
          alignItems="center"
          textAlign="center"
          className={classNames({ active })}
        >
          {page}
        </PageWrapper>
      </Link>
    );
  };
  const pageArray = Array.from(Array(totalPage).keys());
  const prev = currentPage - 1;
  const next = currentPage + 1;

  return (
    <Box display="flex" justifyContent="end">
      <Box as="nav" display="flex" alignItems="center">
        {Number(currentPage) !== 1 && (
          <PaginationPrev query={query} prev={prev} pathname={pathname} />
        )}
        {pageArray.map((page, index) => handlePage(page, index))}
        {Number(currentPage) !== Number(totalPage) && (
          <PaginationNext query={query} next={next} pathname={pathname} />
        )}
      </Box>
    </Box>
  );
};

export default Pagination;
