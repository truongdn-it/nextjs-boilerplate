import React, { Suspense } from 'react';
import Card from '@/components/common/card';
import GridSkeleton from '@/components/common/loading/grid-skeleton.component';

const Home = async () => {
  return (
    <section>
      <div className="py-16">
        <div className="mx-auto px-6 max-w-6xl text-gray-500">
          <div className="text-center">
            <h2 className="text-3xl text-gray-950 dark:text-white font-semibold">
              Quickstart with NextJS Boilerplate
            </h2>
            <p className="mt-6 text-gray-700 dark:text-gray-300">
              A super powerful NextJS boilerplate developed following the
              Feature driven pattern.
            </p>
          </div>
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            <Suspense fallback={<GridSkeleton />}>
              <Card delay={1000} />
            </Suspense>

            <Suspense fallback={<GridSkeleton />}>
              <Card delay={2000} color="green" />
            </Suspense>

            <Suspense fallback={<GridSkeleton />}>
              <Card delay={3000} color="red" />
            </Suspense>

            <Suspense fallback={<GridSkeleton />}>
              <Card delay={4000} color="gray" />
            </Suspense>

            <Suspense fallback={<GridSkeleton />}>
              <Card delay={5000} color="yellow" />
            </Suspense>

            <Suspense fallback={<GridSkeleton />}>
              <Card delay={5000} color="sky" />
            </Suspense>
          </div>
        </div>
      </div>
    </section>
  );
};

const dynamic = 'force-dynamic';

export { dynamic };

// eslint-disable-next-line import/no-unused-modules
export default Home;
