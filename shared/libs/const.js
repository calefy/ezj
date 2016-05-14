/**
 * 定义常量
 */

// 课程状态
export const courseStatus = {
    COURSE_PUBLISHED : 1,
    COURSE_FINISHED : 2,
    COURSE_CLOSED : 3
};
export const courseStatusNames = {
    [courseStatus.COURSE_PUBLISHED] : '已发布',
    [courseStatus.COURSE_FINISHED] : '选退截止',
    [courseStatus.COURSE_CLOSED] : '已结束'
};
export const courseStudyNames = {
    '1' : '正在学习的',
    '2' : '已有成绩的',
};


// 章节类型
export const chapterType = {
    CHAPTER : 1,
    VIDEO: 2,
    HOMEWORK: 3, // 主观题-作业
    EXAM : 4  // 客观题-测验
};

// 评论、投票目标类型
export const targetType = {
    COURSE: 1, // 课程
    QUESTION: 2, // 问题
    ANSWER: 3 // 回答
};

// 广告类型
export const adsType = {
    BANNER: 0,
    TOP: 1,
    CONTENT: 2,
    SIDE: 3,
    LECTURER: 4
}

export const baseCourseCategories = [
    { id: 'great', name: '金融专业实务精品课' },
    { id: 'financial', name: '金融领导力' },
    { id: 'competitive', name: '学位教育' },
];

export const orderStatus = {
    '00': '已创建',
    '10': '待支付',
    '20': '支付完成',
    '30': '已取消',
    '40': '自动取消',
    '50': '支付失败',
    '90': '已完成'
};

export const payType = {
    COURSE: 0,  // 课程
    PRODUCT: 1, // 课程商品
    PACKAGE: 1, // 课程包商品
}
