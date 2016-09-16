<?php

namespace Topxia\WebBundle\Extensions\DataTag;

use Topxia\WebBundle\Extensions\DataTag\DataTag;

class BeginningLiveLessonDataTag extends BaseDataTag implements DataTag
{
    /**
     * 获取一个即将直播的课时
     *
     * 可传入的参数：
     *   afterSecond 必需 即将在多少秒后直播
     *
     * @param  array $arguments 参数
     * @return array 课时
     */

    public function getData(array $arguments)
    {
        return $this->getLiveCourseService()->findBeginingLiveCourse($arguments['afterSecond']);
    }

    protected function getLiveCourseService()
    {
        return $this->getServiceKernel()->createService('Course.LiveCourseService');
    }
}
