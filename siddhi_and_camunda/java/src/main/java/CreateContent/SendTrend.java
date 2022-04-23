package src.main.java.CreateContent;

import org.camunda.bpm.engine.delegate.DelegateExecution;
import org.camunda.bpm.engine.delegate.JavaDelegate;

public class SendTrend {
    public void execute(DelegateExecution execution) throws Exception {
        String trend = (String) execution.getVariable("TrendField");

        execution.getProcessEngineServices().getRuntimeService()
                .createMessageCorrelation("TrendRequest")
                .setVariable("trend", trend)
                .correlate();
    }
}
