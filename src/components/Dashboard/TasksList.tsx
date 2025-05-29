import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Settings2, PlusCircle, MoreVertical } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

interface Task {
  id: string;
  title: string;
  completed: boolean;
  dueDate: string;
}

const initialTasks: Task[] = [
  {
    id: '1',
    title: 'Review and make sure nothing slips through cracks',
    completed: false,
    dueDate: '15 Sep, 2021',
  },
  {
    id: '2',
    title: 'Send meeting invites for sales upcampaign',
    completed: true,
    dueDate: '20 Sep, 2021',
  },
  {
    id: '3',
    title: 'Weekly closed sales won checking with sales team',
    completed: true,
    dueDate: '24 Sep, 2021',
  },
  {
    id: '4',
    title: 'Add notes that can be viewed from the individual view',
    completed: false,
    dueDate: '27 Sep, 2021',
  },
  {
    id: '5',
    title: 'Move stuff to another page',
    completed: false,
    dueDate: '27 Sep, 2021',
  },
  {
    id: '6',
    title: 'Prepare Q4 sales strategy document',
    completed: false,
    dueDate: '01 Oct, 2021',
  },
   {
    id: '7',
    title: 'Follow up with lead from conference',
    completed: true,
    dueDate: '03 Oct, 2021',
  },
  {
    id: '8',
    title: 'Update CRM with new contact information',
    completed: true,
    dueDate: '05 Oct, 2021',
  },
  {
    id: '9',
    title: 'Schedule team performance review meetings',
    completed: false,
    dueDate: '10 Oct, 2021',
  },
  {
    id: '10',
    title: 'Finalize budget for next marketing campaign',
    completed: false,
    dueDate: '15 Oct, 2021',
  },
];

interface TasksListProps {
  className?: string;
}

const TasksList: React.FC<TasksListProps> = ({ className }) => {
  const [tasks, setTasks] = React.useState<Task[]>(initialTasks);

  const toggleTaskCompletion = (taskId: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const completedTasksCount = tasks.filter((task) => task.completed).length;
  const totalTasksCount = tasks.length;
  const progressPercentage = totalTasksCount > 0 ? (completedTasksCount / totalTasksCount) * 100 : 0;

  return (
    <Card className={cn('shadow-sm h-full flex flex-col', className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-medium">My Tasks</CardTitle>
        <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" className="h-7 w-7">
                <Settings2 className="h-4 w-4 text-muted-foreground" />
            </Button>
            <Button variant="default" size="sm" className="h-7 text-xs bg-primary hover:bg-primary/90">
                <PlusCircle className="h-4 w-4 mr-1.5" /> Add Task
            </Button>
        </div>
      </CardHeader>
      <CardContent className="pt-2 flex-grow flex flex-col">
        <div className="mb-3">
          <p className="text-xs text-muted-foreground">
            {completedTasksCount} of {totalTasksCount} remaining
          </p>
          <Progress value={progressPercentage} className="h-1.5 mt-1" />
        </div>
        <ScrollArea className="flex-grow pr-3 -mr-3">
          <ul className="space-y-2.5">
            {tasks.map((task) => (
              <li key={task.id} className="flex items-center justify-between p-2 rounded-md hover:bg-muted/50">
                <div className="flex items-center">
                  <Checkbox
                    id={`task-${task.id}`}
                    checked={task.completed}
                    onCheckedChange={() => toggleTaskCompletion(task.id)}
                    className="mr-3 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                  />
                  <label 
                    htmlFor={`task-${task.id}`} 
                    className={cn(
                        'text-sm font-medium leading-none',
                        task.completed ? 'line-through text-muted-foreground' : 'text-card-foreground'
                    )}>
                    {task.title}
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                    <span className={cn('text-xs', task.completed ? 'text-muted-foreground' : 'text-card-foreground')}>{task.dueDate}</span>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-6 w-6">
                            <MoreVertical className="h-3.5 w-3.5 text-muted-foreground" />
                        </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                        <DropdownMenuItem>Edit Task</DropdownMenuItem>
                        <DropdownMenuItem>Set Reminder</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive focus:text-destructive">Delete Task</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
              </li>
            ))}
          </ul>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default TasksList;
